import { NextPage, GetServerSideProps } from 'next'
import { ReactNode } from 'react'
import Link from 'next/link'
import { DetailedThreadAPI } from 'lib/brain'
import { ThreadBtn, ReplyCard } from "lib/ui"

interface PageProps {
    thread?: DetailedThreadAPI
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    try {
        if (!context.query.thread)
            throw new Error("Thread is undefined")
        const thread = context.query.thread.toString()
        const response = await fetch(`http://127.0.0.1:8000/threads/${thread}/`)
        const res = await response.json()

        const props: PageProps = {
            thread: res
        }
        return { props }
    }
    catch {
        const props: PageProps = {}
        return { props }
    }
}

const ThreadView:NextPage<PageProps> = ({thread}) => {
    if (!thread) return <Layout>Thread not found</Layout>
    return (
        <Layout>
            <h2>Thread #{thread.id}</h2>
            <ThreadBtn data={thread} />
            <div>Replies:</div>
            {thread.replies.map(reply => <ReplyCard key={reply.id} data={reply} />)}
        </Layout>
    )
}

const Layout = ({children}: {children: ReactNode}) => (
    <div>
        <Link href="/">Main page</Link>
        {children}
    </div>
)

export default ThreadView
