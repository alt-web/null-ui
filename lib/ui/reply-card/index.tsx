import { ReplyAPI } from "lib/brain"
import styles from "./index.module.css"

export function ReplyCard({data}: {data: ReplyAPI}) {
    return (
        <div className={styles.reply}>
            <div>#{data.id}</div>
            <div>{data.body}</div>
        </div>
    )
}
