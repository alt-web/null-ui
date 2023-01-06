import Link from "next/link"
import { BoardAPI } from "lib/brain"
import styles from "./index.module.css"

// A simple button with a link to the board page
// ------------------------
// | code | name          |
// ------------------------
export const BoardBtn = ({data}: {data: BoardAPI}) => (
    <Link href={`/boards/${data.code}`} className={styles.btn}>
        <h3 className={styles.code}>{data.code}</h3>
        <div className={styles.title}>{data.name}</div>
    </Link>
)
