import { NextPage, GetServerSideProps } from "next"
import { ReactNode } from 'react'
import Link from 'next/link'
import { DetailedBoardAPI } from "lib/brain"
import { ThreadBtn } from "lib/ui"

interface PageProps {
    board?: DetailedBoardAPI
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    try {
        if (!context.query.board)
            throw new Error("Board is undefined")
        const board = context.query.board.toString()
        const response = await fetch(`http://127.0.0.1:8000/boards/${board}`)
        const res = await response.json()

        const props: PageProps = {
            board: res
        }
        return { props }
    }
    catch {
        return {
            props: {}
        }
    }
}

const BoardView: NextPage<PageProps> = ({board}) => {
    if (!board) return (
        <Layout>Not found</Layout>
    )
    return (
        <Layout>
            <h2>/{board.code}/ - {board.name}</h2>
            <div>Threads:</div>
            {board.threads.map(thread => <ThreadBtn key={thread.id} data={thread} />) }
        </Layout>
    )
}

const Layout = ({children}: {children: ReactNode}) => (
    <div>
        <Link href="/">Main page</Link>
        {children}
    </div>
)

export default BoardView
