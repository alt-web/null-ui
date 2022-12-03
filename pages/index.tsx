import { NextPage } from "next"
import { BoardAPI } from "lib/brain"
import { BoardBtn } from "lib/ui"
import styles from '../styles/Home.module.css'

interface PageProps {
    boards: BoardAPI[]
}

export const getServerSideProps = async() => {
    try {
        const response = await fetch("http://127.0.0.1:8000/boards/")
        const res = await response.json()

        const props: PageProps = {
                boards: res
        }
        return { props }
    }
    catch {
        const props: PageProps = {
            boards: []
        }
        return { props }
    }
}

const Home: NextPage<PageProps> = (props) => {
    return (
        <div className={styles.container}>
            <h2>Доски</h2>
            {props.boards.map(boardObj => <BoardBtn key={boardObj.id} data={boardObj} /> )}
        </div>
    )
}

export default Home
