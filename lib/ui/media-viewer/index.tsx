import { AttachmentAPI, getIpfsUrl } from "lib/brain"
import MediaContext from "lib/media-context"
import { useContext, useState, useEffect, MouseEvent } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
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
        <div className={styles.background} onClick={close}>
            <button className={styles.btn} onClick={prev}>
                <FiChevronLeft />
            </button>
                <div className={styles.container}>
                    <ContentParser attachment={attachment} />
                </div>
            <button className={styles.btn} onClick={next}>
                <FiChevronRight />
            </button>
        </div>
    )
    return <></>
}

function ContentParser({attachment}: {attachment: AttachmentAPI}) {
    if (attachment.mimetype.startsWith("image")) return (
        <Image src={getIpfsUrl(attachment.cid)} alt={attachment.name} fill />
    )
    if (attachment.mimetype.startsWith("video")) return (
        <video className={styles.video} src={getIpfsUrl(attachment.cid)} autoPlay controls />
    )
    if (attachment.mimetype.startsWith("audio")) return (
        <audio className={styles.video} src={getIpfsUrl(attachment.cid)} autoPlay controls />
    )
    return <div>Type is not supported: {attachment.mimetype}</div>
}
