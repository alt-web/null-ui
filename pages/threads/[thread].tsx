import { ReactNode, useState, useEffect, useContext } from 'react'
import { FiHome } from "react-icons/fi"
import Link from 'next/link'
import { useRouter } from "next/router"
import useSWR, { useSWRConfig } from "swr"
import { DetailedThreadAPI, getBackendUrl } from "lib/brain"
import { Message, NewReplyForm } from "lib/ui"
import MediaContext from "lib/media-context"
import styles from "styles/thread.module.css"


const ThreadView = () => {
    const router = useRouter()
    const thread = router.query.thread ? router.query.thread.toString() : null
    const url = thread ? getBackendUrl(`threads/${thread}`) : null
    const { data, error } = useSWR<DetailedThreadAPI, Error>(url)
    const { mutate } = useSWRConfig()
    const update = () => mutate(url)

    const [targets, setTargets] = useState<number[]>([])

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
            {data.replies.map((reply, index) =>
                <Message
                    key={reply.id}
                    data={reply}
                    onReply={index > 0 && !targets.includes(reply.id) ? () => setTargets([...targets, reply.id]) : undefined}
                />
            )}
            <NewReplyForm threadId={data.id} onSuccess={update} targets={targets} setTargets={(v) => setTargets(v)} />
        </Layout>
    )
}

const Layout = ({children}: {children: ReactNode}) => (
    <div className={styles.page}>
        <div className={styles.navigation}>
            <Link href="/"><FiHome /></Link>
        </div>
        {children}
    </div>
)

export default ThreadView
