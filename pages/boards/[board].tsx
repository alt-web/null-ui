import { NextPage, GetServerSideProps } from "next"
import { ReactNode, useContext, useEffect } from 'react'
import Link from 'next/link'
import { DetailedBoardAPI, AttachmentAPI } from "lib/brain"
import { ThreadBtn, NewThreadForm } from "lib/ui"
import MediaContext from "lib/media-context"

interface PageProps {
    board: DetailedBoardAPI
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    if (!context.query.board)
        return { notFound: true }
    const board = context.query.board.toString()
    
    const response = await fetch(`http://127.0.0.1:8000/boards/${board}`)
    if (response.status === 404)
        return { notFound: true }
    const res = await response.json()

    const props: PageProps = {
        board: res
    }
    return { props }
}

const BoardView: NextPage<PageProps> = ({board}) => {
    const {setAttachments} = useContext(MediaContext)

    useEffect(() => {
        const allAttachments: AttachmentAPI[] = []
        for (const thread of board.threads) {
            for (const attachment of thread.attachments) {
                allAttachments.push(attachment)
            }
        }
        
        setAttachments(allAttachments)
    }, [board.threads])

    return (
        <Layout>
            <h2>/{board.code}/ - {board.name}</h2>
            <div>Threads:</div>
            {board.threads.map(thread => <ThreadBtn key={thread.id} data={thread} />) }
            <NewThreadForm boardId={board.id} />
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
