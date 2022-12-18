import Image from "next/image"
import { createRef } from "react"
import { AttachmentAPI } from "lib/brain"
import styles from "./index.module.css"

export function Attachment({data}: {data: AttachmentAPI}) {
    if (data.mimetype.startsWith("image")) return <ImageAttachment cid={data.cid} />
    if (data.mimetype.startsWith("audio")) return <AudioAttachment cid={data.cid} />
    return <></>
}

function ImageAttachment({cid}: {cid: string}) {
    return (
        <div className={styles.image}>
            <Image src={getIpfsUrl(cid)} alt="Attachment" fill />
        </div>
    )
}

function AudioAttachment({cid}: {cid: string}) {
    const player = createRef<HTMLAudioElement>()

    const toggle = () => {
        if (player.current) {
            if (player.current.paused) player.current.play()
            else player.current.pause()
        }
    }

    return (
        <div>
            <div className={styles.placeholder} onClick={toggle}>Audio</div>
            <audio src={getIpfsUrl(cid)} ref={player} />
        </div>
    )
}

function getIpfsUrl(cid: string) {
    return `http://${cid}.ipfs.localhost:8080`
}
