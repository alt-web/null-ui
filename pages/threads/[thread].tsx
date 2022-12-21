import { NextPage } from 'next'
import { ReactNode, useEffect, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from "next/router"
import useSWR, { useSWRConfig } from "swr"
import { DetailedThreadAPI, getBackendUrl } from "lib/brain"
import { ThreadBtn, ReplyCard, NewReplyForm } from "lib/ui"
import MediaContext from "lib/media-context"
import styles from "styles/thread.module.css"


const ThreadView: NextPage = () => {
    const router = useRouter()
    const thread = router.query.thread ? router.query.thread.toString() : null
    const url = thread ? getBackendUrl(`threads/${thread}`) : null
    const { data, error } = useSWR<DetailedThreadAPI, Error>(url)
    const { mutate } = useSWRConfig()
    const update = () => mutate(url)

    const { setAttachments } = useContext(MediaContext)

    useEffect(() => {
        if (data) {
            const allAttachments = [...data.attachments]
            for (const reply of data.replies) {
                for (const attachment of reply.attachments) {
                    allAttachments.push(attachment)
                }
            }
        
            setAttachments(allAttachments)
        }
    }, [data])

    if (error) return <Layout>Error</Layout>
    if (!data) return <Layout>Loading</Layout>

    return (
        <Layout>
            <h2>Thread #{data.id}</h2>
            <ThreadBtn data={data} />
            <h4>Replies:</h4>
            <div className={styles.replies}>
                {data.replies.map(reply =>
                    <ReplyCard key={reply.id} data={reply} />)}
            </div>
            <NewReplyForm threadId={data.id} onSuccess={update} />
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
