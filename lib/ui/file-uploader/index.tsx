import { useState, ChangeEvent } from "react"
import { getBackendUrl, AttachmentAPI } from "lib/brain"
import styles from "./index.module.css"

export function FileUploader() {
    const [attachments, setAttachments] = useState<AttachmentAPI[]>([])

    const appendAttachment = (newAttachment: AttachmentAPI) => {
        if (attachments.length < 4)
            setAttachments([...attachments, newAttachment])
    }

    const removeAttachment = (aId: number) => {
        setAttachments(attachments.filter(a => a.id != aId))
    }

    return (
        <div>
            <h4>Upload files ({attachments.length}/4)</h4>
            
            {attachments.map((attachment, index) =>
                <div key={attachment.id} className={styles.attachment}>
                    <input type="hidden" name={`aid${index+1}`} value={attachment.id} readOnly />
                    <div>{attachment.name}</div>
                    <button onClick={() => removeAttachment(attachment.id)}>x</button>
                </div>
            )}
            
            {attachments.length < 4 &&
                <input
                    type="file"
                    onChange={(e) => uploadFile(e, appendAttachment)}
                    className={styles.uploader}
                />
            }
        </div>
    )
}

async function uploadFile(e: ChangeEvent<HTMLInputElement>, appendAid: (arg0: AttachmentAPI) => void) {
    e.preventDefault()

    const fd = new FormData()

    if (e.target.files === null) {
        return
    }

    fd.append("file", e.target.files[0])
    const options = {
        method: "POST",
        body: fd
    }

    const url = getBackendUrl('attachments')
    const response = await fetch(url, options)
    const data = await response.json()

    appendAid(data)
    e.target.value = ""
}
