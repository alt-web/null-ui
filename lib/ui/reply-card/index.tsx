import { ReplyAPI } from "lib/brain"
import { Attachment } from "../attachment"
import styles from "./index.module.css"

export function ReplyCard({data}: {data: ReplyAPI}) {
    return (
        <div className={styles.reply}>
            <div className={styles.heading}>
                <div>#{data.id}</div>
                <div>{new Date(data.created_at).toLocaleString("en")}</div>
            </div>
            <div>{data.body}</div>
            {data.attachments.map(attachment => <Attachment key={attachment.id} data={attachment} />)}
        </div>
    )
}
