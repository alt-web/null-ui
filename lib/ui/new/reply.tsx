import { FormEvent } from "react"
import { getBackendUrl } from "lib/brain"
import { FileUploader } from "lib/ui"
import styles from "./common.module.css"

export function NewReplyForm({threadId, onSuccess}: {threadId: number, onSuccess: () => void}) {
    return (
        <form className={styles.form} onSubmit={(e) => sendReply(e, onSuccess)}>
            <h4>New reply</h4>
            <input type="hidden" name="origin" value={threadId} />
            <textarea placeholder="Body" name="body" required />
            <FileUploader />
            <button type="submit">Отправить</button>
        </form>
    )
}

interface ReplyForm extends HTMLFormElement {
    origin: HTMLInputElement
    body: HTMLInputElement
    aid1?: HTMLInputElement
    aid2?: HTMLInputElement
    aid3?: HTMLInputElement
    aid4?: HTMLInputElement
}

async function sendReply(e: FormEvent, onSuccess: () => void) {
    e.preventDefault()
    const target = e.target as ReplyForm

    const fd = new FormData()
    fd.append("origin", target.origin.value)
    fd.append("body", target.body.value)

    const appendAttachment = (name: string) => {
        if (target[name])
            fd.append(name, target[name].value)
    }

    appendAttachment("aid1")
    appendAttachment("aid2")
    appendAttachment("aid3")
    appendAttachment("aid4")

    const options = {
        method: "POST",
        body: fd
    }

    const url = getBackendUrl("replies")
    const response = await fetch(url, options)
    if (response.status >= 200 && response.status < 300)
        onSuccess()
    else
        alert('Something went wrong')
}
