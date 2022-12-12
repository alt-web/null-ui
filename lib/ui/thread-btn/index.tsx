import Link from 'next/link'
import { ThreadAPI } from "lib/brain"
import { Attachment } from "lib/ui"
import styles from "./index.module.css"

export function ThreadBtn({data}: {data: ThreadAPI}) {
    return (
        <Link href={`/threads/${data.id}`}>
            <div className={styles.btn}>
                <div>#{data.id}</div>
                <div>{data.body}</div>
                {data.attachments.map(attachment => <Attachment key={attachment.id} data={attachment} />)}
            </div>
        </Link>
    )
}
