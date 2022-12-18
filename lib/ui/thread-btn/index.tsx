import Link from 'next/link'
import { ThreadAPI } from "lib/brain"
import { Attachment } from "lib/ui"
import styles from "./index.module.css"

export function ThreadBtn({data}: {data: ThreadAPI}) {
    return (
            <div className={styles.btn}>
                <Link href={`/threads/${data.id}`}>
                    <div>#{data.id}</div>
                </Link>
                <div>{data.body}</div>
                <div className={styles.attachments}>
                    {data.attachments.map(attachment =>
                        <Attachment key={attachment.id} data={attachment} />)}
                </div>
            </div>
    )
}
