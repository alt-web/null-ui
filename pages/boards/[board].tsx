import { NextPage, GetServerSideProps } from "next"
import { useContext, useEffect } from 'react'
import { FiHome, FiChevronRight } from "react-icons/fi"
import Link from 'next/link'
import { DetailedBoardAPI, AttachmentAPI, getBackendUrl } from "lib/brain"
import { Message, NewThreadForm } from "lib/ui"
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
            for (const reply of thread.last_replies) {
                for (const attachment of reply.attachments) {
                    allAttachments.push(attachment)
                }
            }
        }
        
        setAttachments(allAttachments)
    }, [board.threads])

    return (
        <div className={styles.page}>
            <Navigation boardCode={board.code} boardName={board.name} />
            {board.threads.map(thread =>
                <Message
                    key={thread.id}
                    data={thread.first_reply}
                    href={`/threads/${thread.id}`}
                    replies={thread.last_replies} />
            )}
            <NewThreadForm boardId={board.id} />
        </div>
    )
}

function Navigation({boardCode, boardName}: {boardCode: string, boardName: string}) {
    return (
        <div className={styles.navigation}>
            <Link href="/"><FiHome /></Link>
            <FiChevronRight />
            <div>{boardCode} - {boardName}</div>
        </div>
    )
}

export default BoardView
