import { NextPage } from "next"
import { BoardAPI, getBackendUrl } from "lib/brain"
import { BoardBtn } from "lib/ui"
import styles from '../styles/Home.module.css'

interface PageProps {
    boards: BoardAPI[]
}

export const getServerSideProps = async() => {
    const url = getBackendUrl('boards')
    const response = await fetch(url)
    const res = await response.json()

    const props: PageProps = {
        boards: res
    }
    return { props }
}

const Home: NextPage<PageProps> = (props) => {
    return (
        <div className={styles.container}>
            <h2>Доски</h2>
            <div className={styles.boards}>
                {props.boards.map(boardObj =>
                    <BoardBtn key={boardObj.id} data={boardObj} /> )}
            </div>
        </div>
    )
}

export default Home
