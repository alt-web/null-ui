import { NextPage, GetServerSideProps } from "next"
import { ReactNode, useContext, useEffect } from 'react'
import Link from 'next/link'
import { DetailedBoardAPI, AttachmentAPI, getBackendUrl } from "lib/brain"
import { ThreadBtn, NewThreadForm } from "lib/ui"
import MediaContext from "lib/media-context"
import styles from "styles/board.module.css"

interface PageProps {
    board: DetailedBoardAPI
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    if (!context.query.board)
        return { notFound: true }
    const board = context.query.board.toString()
    
    const url = getBackendUrl(`boards/${board}`)
    const response = await fetch(url)
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
            for (const attachment of thread.first_reply.attachments) {
                allAttachments.push(attachment)
            }
        }
        
        setAttachments(allAttachments)
    }, [board.threads])

    return (
        <Layout>
            <h2>/{board.code}/ - {board.name}</h2>
            <div>Threads:</div>
            <div className={styles.threads}>
                {board.threads.map(thread =>
                    <ThreadBtn key={thread.id} data={thread} />) }
            </div>
            <NewThreadForm boardId={board.id} />
        </Layout>
    )
}

const Layout = ({children}: {children: ReactNode}) => (
    <div className={styles.page}>
        <Link href="/">Main page</Link>
        {children}
    </div>
)

export default BoardView
