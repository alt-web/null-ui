import { BoardAPI } from "lib/brain"
import Link from "next/link"
import styles from "./index.module.css"

export const BoardBtn = ({data}: {data: BoardAPI}) => {
    return (
        <Link href={`/boards/${data.id}`}>
            <div className={styles.btn}>
                <h4 className={styles.title}>/{data.code}/ - {data.name}</h4>
                <div>{data.description}</div>
            </div>
        </Link>
    )
}
