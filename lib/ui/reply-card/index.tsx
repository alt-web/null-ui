import { useState, useEffect } from "react"
import { FiHash, FiCalendar } from "react-icons/fi"
import { ReplyAPI, AttachmentAPI } from "lib/brain"
import { Attachment } from "../attachment"
import styles from "./index.module.css"

export function ReplyCard({data}: {data: ReplyAPI}) {
    return (
        <div className={styles.reply}>
            <div className={styles.heading}>
                <div>
                    <FiHash />{data.id}
                </div>
                <DateTime createdAt={data.created_at} />
            </div>
            <p>{data.body}</p>
            <Attachments data={data.attachments} />
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
