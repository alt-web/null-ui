import Link from 'next/link'
import { ThreadAPI } from "lib/brain"
import styles from "./index.module.css"

export function ThreadBtn({data}: {data: ThreadAPI}) {
    return (
        <Link href={`/threads/${data.id}`}>
            <div className={styles.btn}>
                <div>#{data.id}</div>
                <div>{data.body}</div>
            </div>
        </Link>
    )
}
