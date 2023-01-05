import { useState, useEffect } from "react"
import { FiHash, FiCalendar, FiCornerDownRight, FiChevronsRight } from "react-icons/fi"
import Link from "next/link"
import { ReplyAPI, AttachmentAPI } from "lib/brain"
import { Attachment } from "../attachment"
import styles from "./index.module.css"

export function Message({data, href, replies, onReply}: {data: ReplyAPI, href?: string, replies?: ReplyAPI[], onReply?: () => void}) {
    return (
        <div className={styles.container}>
            <div className={styles.message}>
                { href && <Link href={href}>
                    <div className={styles.link}></div>
                </Link> }
                <div className={styles.heading}>
                    <div><FiHash />{data.id}</div>
                    <DateTime createdAt={data.created_at} />
                    <div className={styles.space}></div>
                    <ReplyButton onReply={onReply} />
                </div>
                <Targets replyId={data.id} data={data.targets} />
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

function ReplyButton({onReply}: {onReply?: () => void}) {
    if (onReply === undefined) return <></>

    return (
        <button className={styles.replyBtn} onClick={onReply}>
            <FiCornerDownRight /> Reply
        </button>
    )
}

function Targets({replyId, data}: {replyId: number, data: number[]}) {
    const filteredData = data.filter(t => t < replyId)

    if (filteredData.length === 0) return <></>

    return (
        <div className={styles.targets}>
            {filteredData.map(target => (
                <div key={target}>
                    <FiChevronsRight /> #{target}
                </div>
            ))}
        </div>
    )
}
