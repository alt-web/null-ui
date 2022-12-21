import Image from "next/image"
import { useContext } from "react"
import { AttachmentAPI, getIpfsUrl } from "lib/brain"
import styles from "./index.module.css"
import MediaContext from "lib/media-context"

export function Attachment({data}: {data: AttachmentAPI}) {
    if (data.mimetype.startsWith("image")) return <ImageAttachment data={data} />
    if (data.mimetype.startsWith("audio")) return <AudioAttachment data={data} />
    if (data.mimetype.startsWith("video")) return <VideoAttachment data={data} />
    return <></>
}

function ImageAttachment({data}: {data: AttachmentAPI}) {
    const { setAid } = useContext(MediaContext)

    return (
        <div className={styles.image} onClick={() => setAid(data.id)}>
            <Image src={getIpfsUrl(data.cid)} alt={data.name} fill />
        </div>
    )
}

function AudioAttachment({data}: {data: AttachmentAPI}) {
    const { setAid } = useContext(MediaContext)

    return (
        <div>
            <div className={styles.placeholder} onClick={() => setAid(data.id)}>Audio</div>
        </div>
    )
}

function VideoAttachment({data}: {data: AttachmentAPI}) {
    const { setAid } = useContext(MediaContext)

    return (
        <div>
            <div className={styles.placeholder} onClick={() => setAid(data.id)}>Video</div>
        </div>
    )
}
