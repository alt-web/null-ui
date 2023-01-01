import Link from 'next/link'
import { ThreadAPI } from "lib/brain"
import { Attachment } from "lib/ui"
import styles from "./index.module.css"

export function ThreadBtn({data}: {data: ThreadAPI}) {
    return (
            <div className={styles.btn}>
                <div className={styles.heading}>
                    <Link href={`/threads/${data.id}`}>
                        <div>#{data.id}</div>
                    </Link>
                    <div>
                        {new Date(data.first_reply.created_at).toLocaleString("en")}
                    </div>
                </div>
                <div>{data.first_reply.body}</div>
                <div className={styles.attachments}>
                    {data.first_reply.attachments.map(attachment =>
                        <Attachment key={attachment.id} data={attachment} />)}
                </div>
            </div>
    )
}
