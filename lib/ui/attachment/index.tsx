import Image from "next/image"
import { useContext } from "react"
import { FiHeadphones, FiVideo, FiDownload, FiImage } from "react-icons/fi"
import { AttachmentAPI, getIpfsUrl } from "lib/brain"
import styles from "./index.module.css"
import MediaContext from "lib/media-context"

interface AttachmentProps {
    data: AttachmentAPI
    small?: boolean
}

export function Attachment({data, small}: AttachmentProps) {
    return (
        <div>
            <AttachmentParser data={data} small={small} />
            <Metadata data={data} small={small} />
        </div>
    )
}

function AttachmentParser({data, small}: AttachmentProps) {
    if (data.mimetype.startsWith("image")) return <ImageAttachment data={data} small={small} />
    if (data.mimetype.startsWith("audio") || data.mimetype === "application/octet-stream")
        return <AudioAttachment data={data} small={small} />
    if (data.mimetype.startsWith("video")) return <VideoAttachment data={data} small={small} />
    return <></>
}

function ImageAttachment({data, small}: AttachmentProps) {
    const { setAid } = useContext(MediaContext)
    const className = small ? styles.smallPlaceholder : styles.placeholder
    
    // Returns the preview if it exists,
    // otherwise the image icon.
    const getContent = () => {
        if (data.preview) return (
            <Image
                src={getIpfsUrl(data.preview.cid)}
                sizes="100px"
                alt={`${data.name} - Preview`}
                fill
            />
        )
        return <FiImage />
    }

    return (
        <div className={className} onClick={() => setAid(data.id)}>
            {getContent()}
        </div>
    )
}

function AudioAttachment({data, small}: AttachmentProps) {
    const { setAid } = useContext(MediaContext)
    const className = small ? styles.smallPlaceholder : styles.placeholder

    // Returns the cover if it exists,
    // otherwise the headphones icon.
    const getContent = () => {
        if (data.preview) return (
            <Image
                src={getIpfsUrl(data.preview.cid)}
                sizes="100px"
                alt={`${data.name} - Cover`}
                fill
            />
        )
        return <FiHeadphones />
    }

    return (
        <div>
            <div className={className} onClick={() => setAid(data.id)}>
                {getContent()}
            </div>
        </div>
    )
}

function VideoAttachment({data, small}: AttachmentProps) {
    const { setAid } = useContext(MediaContext)
    const className = small ? styles.smallPlaceholder : styles.placeholder
    
    // Returns video preview if it exists,
    // otherwise the video icon.
    const getContent = () => {
        if (data.preview) return (
            <Image
                src={getIpfsUrl(data.preview.cid)}
                sizes="100px"
                alt={`${data.name} - Preview`}
                fill
            />
        )
        return <FiVideo />
    }

    return (
        <div>
            <div className={className} onClick={() => setAid(data.id)}>
                {getContent()}
            </div>
        </div>
    )
}

function Metadata({data, small}: AttachmentProps) {
    if (small) return <></>

    return (
        <div className={styles.metadata}>
            <a href={getIpfsUrl(data.cid)} target="_blank" rel="noreferrer">
                <button>
                    <FiDownload />
                </button>
            </a>
            <div>{data.name}</div>
        </div>
    )
}
