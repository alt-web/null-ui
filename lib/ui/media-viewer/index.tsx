import { AttachmentAPI, getIpfsUrl } from "lib/brain"
import MediaContext from "lib/media-context"
import { useContext, useState, useEffect, MouseEvent, ReactNode } from "react"
import {
    FiChevronLeft,
    FiChevronRight,
    FiFile,
    FiHardDrive,
    FiDownload,
    FiClock,
    FiMaximize2
} from "react-icons/fi"
import styles from "./index.module.css"
import Image from "next/image"

export function MediaViewer() {
    const { attachments, aid, setAid } = useContext(MediaContext)
    const [index, setIndex] = useState<number|null>(null)

    useEffect(() => {
        attachments.map((a,i) => {
            if (a.id === aid)
                setIndex(i)
        })
    }, [aid, attachments])
    const attachment = index !== null ? attachments[index] : null

    const close = () => {
        setIndex(null)
        setAid(null)
    }
    const prev = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (index !== null) {
            if (index > 0)
                setIndex(index - 1)
            else
                setIndex(attachments.length - 1)
        }
    }
    const next = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (index !== null) {
            if (index < attachments.length - 1)
                setIndex(index + 1)
            else
                setIndex(0)
        }
    }

    if (attachment !== null) return (
        <div className={styles.viewer}>
            <div className={styles.background} onClick={close}></div>
            <div className={styles.mainRow}>
                <Button isVisible={attachments.length > 1} onClick={prev} icon={<FiChevronLeft />} />
                <div className={styles.container}>
                    <ContentParser attachment={attachment} />
                </div>
                <Button isVisible={attachments.length > 1} onClick={next} icon={<FiChevronRight />} />
            </div>
            <div className={styles.secondaryRow}>
                <div><FiFile /> {attachment.name}</div>
                <div><FiHardDrive /> {formatBytes(attachment.size)}</div>
                {attachment.width && attachment.height && <div>
                    <FiMaximize2 /> {attachment.width}x{attachment.height}
                </div>}
                {attachment.duration && <div>
                    <FiClock /> {formatTime(attachment.duration)}
                </div> }
                <div>
                    <a href={getIpfsUrl(attachment.cid)} target="_blank" rel="noreferrer">
                        <FiDownload /> Download
                    </a>
                </div>
            </div>
        </div>
    )
    return <></>
}

interface ButtonProps {
    icon: ReactNode,
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
    isVisible: boolean
}

function Button({icon, onClick, isVisible}: ButtonProps) {
    if (!isVisible) return <></>
    
    return (
        <button className={styles.btn} onClick={onClick}>
            {icon}
        </button>
    )
}

function ContentParser({attachment}: {attachment: AttachmentAPI}) {
    if (attachment.mimetype.startsWith("image")) return (
        <Image src={getIpfsUrl(attachment.cid)} alt={attachment.name} fill />
    )
    if (attachment.mimetype.startsWith("video")) return (
        <video className={styles.video} src={getIpfsUrl(attachment.cid)} autoPlay controls />
    )
    if (attachment.mimetype.startsWith("audio") || attachment.mimetype === "application/octet-stream") return (
        <audio className={styles.audio} src={getIpfsUrl(attachment.cid)} autoPlay controls />
    )
    return <div>Type is not supported: {attachment.mimetype}</div>
}

function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} b`

    const kbytes = bytes / 1024
    if (kbytes < 1024) return `${kbytes.toFixed(2)} kb`

    const mbytes = kbytes / 1024
    return `${mbytes.toFixed(2)} mb`
}

// Returns string in format "00h 00m 00s".
// Minutes and hours may be skipped.
function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds - (hours * 3600)) / 60)
    const secondsLeft = Math.round(seconds - (hours * 3600) - (minutes * 60))

    // Show hours, minutes and seconds
    if (hours) {
        const minutesStr = minutes.toString().padStart(2, '0')
        const secondsStr = secondsLeft.toString().padStart(2, '0')
        return `${hours}h ${minutesStr}m ${secondsStr}s`
    }

    // Show minutes and seconds
    if (minutes) {
        const secondsStr = secondsLeft.toString().padStart(2, '0')
        return `${minutes}m ${secondsStr}s`
    }

    // Show seconds
    return `${secondsLeft}s`
}
