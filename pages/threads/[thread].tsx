import { NextPage, GetServerSideProps } from 'next'
import { ReactNode, useEffect, useContext } from 'react'
import Link from 'next/link'
import { DetailedThreadAPI } from 'lib/brain'
import { ThreadBtn, ReplyCard, NewReplyForm } from "lib/ui"
import MediaContext from "lib/media-context"
import styles from "styles/thread.module.css"

interface PageProps {
    thread: DetailedThreadAPI
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    if (!context.query.thread)
        return { notFound: true }
    
    const thread = context.query.thread.toString()
    const response = await fetch(`http://127.0.0.1:8000/threads/${thread}/`)
    if (response.status === 404)
        return { notFound: true }
    const res = await response.json()

    const props: PageProps = {
        thread: res
    }
    return { props }
}

const ThreadView:NextPage<PageProps> = ({thread}) => {
    const { setAttachments } = useContext(MediaContext)

    useEffect(() => {
        const allAttachments = [...thread.attachments]
        for (const reply of thread.replies) {
            for (const attachment of reply.attachments) {
                allAttachments.push(attachment)
            }
        }
        
        setAttachments(allAttachments)
    }, [thread.attachments, thread.replies])

    return (
        <Layout>
            <h2>Thread #{thread.id}</h2>
            <ThreadBtn data={thread} />
            <h4>Replies:</h4>
            <div className={styles.replies}>
                {thread.replies.map(reply =>
                    <ReplyCard key={reply.id} data={reply} />)}
            </div>
            <NewReplyForm threadId={thread.id} />
        </Layout>
    )
}

const Layout = ({children}: {children: ReactNode}) => (
    <div className={styles.page}>
        <Link href="/">Main page</Link>
        {children}
    </div>
)

export default ThreadView
