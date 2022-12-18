import Image from "next/image"
import { AttachmentAPI } from "lib/brain"
import styles from "./index.module.css"

export function Attachment({data}: {data: AttachmentAPI}) {
    return (
        <div>
            <div>Attachment: {data.cid.slice(0,4)}...{data.cid.slice(-4)}</div>
            <div>Filename: {data.name}</div>
            { data.mimetype.startsWith("image") && <div className={styles.image}>
                <Image src={getIpfsUrl(data.cid)} alt="Attachment" fill />
            </div> }
            { data.mimetype.startsWith("audio") && <audio src={getIpfsUrl(data.cid)} controls /> }
        </div>
    )
}

function getIpfsUrl(cid: string) {
    return `http://${cid}.ipfs.localhost:8080`
}
