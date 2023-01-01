import { useState, useEffect } from "react"
import { FiHash, FiCalendar } from "react-icons/fi"
import Link from "next/link"
import { ReplyAPI, AttachmentAPI } from "lib/brain"
import { Attachment } from "../attachment"
import styles from "./index.module.css"

export function Message({data, href, replies}: {data: ReplyAPI, href?: string, replies?: ReplyAPI[]}) {
    return (
        <div className={styles.container}>
            <div className={styles.message}>
                { href && <Link href={href}>
                    <div className={styles.link}></div>
                </Link> }
                <div className={styles.heading}>
                    <div><FiHash />{data.id}</div>
                    <DateTime createdAt={data.created_at} />
                </div>
                <p>{data.body}</p>
                <Attachments data={data.attachments} />
            </div>
            
            <div className={styles.replies}>
                {replies && replies.map(reply => <Reply data={reply} key={reply.id} />)}
            </div>
        </div>
    )
}

// Shows date and time without hydration errors
function DateTime({createdAt}: {createdAt: string}) {
    const dateObj = new Date(createdAt)
    const enString = dateObj.toLocaleString("en")
    const [date, setDate] = useState(enString)

    useEffect(() => {
        const localeString = dateObj.toLocaleString()
        setDate(localeString)
    }, [])

    return (
        <div>
            <FiCalendar />{date}
        </div>
    )
}

function Attachments({data}: {data: AttachmentAPI[]}) {
    if (data.length < 1) return <></>
    return (
        <div className={styles.attachments}>
            {data.map(attachment =>
                <Attachment key={attachment.id} data={attachment} />)}
        </div>
    )
}

function Reply({data}: {data: ReplyAPI}) {
    return (
        <div>
            {data.attachments.map(attachment =>
                <Attachment key={attachment.id} data={attachment} small={true} />)}
            {data.body}
        </div>
    )
}
