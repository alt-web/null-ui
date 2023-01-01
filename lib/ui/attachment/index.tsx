import Image from "next/image"
import { useContext } from "react"
import { FiHeadphones, FiVideo } from "react-icons/fi"
import { AttachmentAPI, getIpfsUrl } from "lib/brain"
import styles from "./index.module.css"
import MediaContext from "lib/media-context"

interface AttachmentProps {
    data: AttachmentAPI
    small?: boolean
}

export function Attachment({data, small}: AttachmentProps) {
    if (data.mimetype.startsWith("image")) return <ImageAttachment data={data} small={small} />
    if (data.mimetype.startsWith("audio") || data.mimetype === "application/octet-stream")
        return <AudioAttachment data={data} small={small} />
    if (data.mimetype.startsWith("video")) return <VideoAttachment data={data} small={small} />
    return <></>
}

function ImageAttachment({data, small}: AttachmentProps) {
    const { setAid } = useContext(MediaContext)
    const className = small ? styles.smallImage : styles.image

    return (
        <div className={className} onClick={() => setAid(data.id)}>
            <Image src={getIpfsUrl(data.cid)} alt={data.name} fill />
        </div>
    )
}

function AudioAttachment({data, small}: AttachmentProps) {
    const { setAid } = useContext(MediaContext)
    const className = small ? styles.smallPlaceholder : styles.placeholder

    return (
        <div>
            <div className={className} onClick={() => setAid(data.id)}>
                <FiHeadphones />
            </div>
        </div>
    )
}

function VideoAttachment({data, small}: AttachmentProps) {
    const { setAid } = useContext(MediaContext)
    const className = small ? styles.smallPlaceholder : styles.placeholder

    return (
        <div>
            <div className={className} onClick={() => setAid(data.id)}>
                <FiVideo />
            </div>
        </div>
    )
}
