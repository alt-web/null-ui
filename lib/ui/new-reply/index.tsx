import { FormEvent } from "react"
import { FileUploader } from "lib/ui"
import styles from "./index.module.css"

export function NewReplyForm({threadId}: {threadId: number}) {
    return (
        <form className={styles.form} onSubmit={(e) => sendReply(e)}>
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

async function sendReply(e: FormEvent) {
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

    const url = "http://localhost:8000/replies/"
    const response = await fetch(url, options)
    if (response.status >= 200 && response.status < 300)
        alert('Reply was created')
    else
        alert('Something went wrong')
}