import { BoardAPI } from "lib/brain"
import Link from "next/link"
import styles from "./index.module.css"

export const BoardBtn = ({data}: {data: BoardAPI}) => {
    return (
        <Link href={`/boards/${data.code}`}>
            <div className={styles.btn}>
                <div className={styles.code}>/{data.code}/</div>
                <h4 className={styles.title}>{data.name}</h4>
            </div>
        </Link>
    )
}
