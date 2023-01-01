import { NextPage } from 'next'
import { ReactNode, useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from "next/router"
import useSWR, { useSWRConfig } from "swr"
import { DetailedThreadAPI, getBackendUrl } from "lib/brain"
import { Message, NewReplyForm } from "lib/ui"
import MediaContext from "lib/media-context"
import styles from "styles/thread.module.css"


const ThreadView: NextPage = () => {
    const router = useRouter()
    const thread = router.query.thread ? router.query.thread.toString() : null
    const url = thread ? getBackendUrl(`threads/${thread}`) : null
    const { data, error } = useSWR<DetailedThreadAPI, Error>(url)
    const { mutate } = useSWRConfig()
    const update = () => mutate(url)

    const [target, setTarget] = useState<number|undefined>(undefined)

    const { setAttachments } = useContext(MediaContext)

    useEffect(() => {
        if (data) {
            const allAttachments = []
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
            <div className={styles.replies}>
                {data.replies.map((reply, index) =>
                    <Message
                        key={reply.id}
                        data={reply}
                        onReply={index > 0 ? () => setTarget(reply.id) : undefined}
                    />
                )}
            </div>
            <NewReplyForm threadId={data.id} onSuccess={update} target={target} clearTarget={() => setTarget(undefined)} />
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
