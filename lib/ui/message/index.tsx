import { useState, useEffect, createRef, ReactNode } from "react"
import { FiHash, FiCalendar, FiCornerDownRight, FiChevronsRight } from "react-icons/fi"
import Link from "next/link"
import useSWR from "swr"
import { ReplyAPI, AttachmentAPI, getBackendUrl } from "lib/brain"
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
                <Targets replyId={data.id} data={data.connections} />
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

// A list of all messages that have been mentioned.
// Example: >>14 >>15
function Targets({replyId, data}: {replyId: number, data: number[]}) {
    const filteredData = data.filter(t => t < replyId)

    if (filteredData.length === 0) return <></>

    return (
        <div className={styles.targets}>
            {filteredData.map(target => (
                <Target messageId={target} key={target} />
            ))}
        </div>
    )
}

// The card of the mentioned message.
// On hover, the message is loaded and displayed over the top.
// Example: >>14
function Target({messageId}: {messageId: number}) {
    const [showMessage, setShowMessage] = useState(false)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const box = createRef<HTMLDivElement>()
    
    useEffect(() => {
        const trigger = box.current
        if (!trigger) return () => {}

        // Add event listeners
        const showTargetMessage = () => setShowMessage(true)
        const hideTargetMessage = () => setShowMessage(false)
        trigger.addEventListener("mouseover", showTargetMessage)
        trigger.addEventListener("mouseleave", hideTargetMessage)
        
        // Set popup position
        setX(trigger.offsetLeft)
        setY(trigger.offsetTop + 20)
        
        // Remove event listeners
        return () => {
            if (trigger) {
                trigger.removeEventListener("mouseover", showTargetMessage)
                trigger.removeEventListener("mouseleave", hideTargetMessage)
            }
        }
    }, [box, setShowMessage])
    
    return (
        <div ref={box}>
            <FiChevronsRight /> #{messageId}
            {showMessage && <MessagePopUp messageId={messageId} x={x} y={y} /> }
        </div>
    )
}

// Card of the message that was mentioned
function MessagePopUp({messageId, x, y}: {messageId: number, x: number, y: number}) {
    const {data, error} = useSWR<ReplyAPI, Error>(getBackendUrl(`/replies/${messageId}`))

    const position = {
        top: `${y}px`,
        left: `${x}px`,
    }

    const Layout = ({children}: {children: ReactNode}) => (
        <div style={position} className={styles.messagePopUp}>
            {children}
        </div>
    )

    if (error) return <Layout>Error</Layout>
    if (!data) return <Layout>Loading</Layout>
    
    return (
        <Layout>
            <Message data={data} />
        </Layout>
    )
}
