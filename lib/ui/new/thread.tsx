import { FormEvent } from "react"
import { FiMessageSquare, FiCornerDownRight } from "react-icons/fi"
import Router from "next/router"
import { getBackendUrl } from "lib/brain"
import { FileUploader } from "lib/ui"
import styles from "./common.module.css"

export function NewThreadForm({boardId}: {boardId: number}) {
    return (
        <form className={styles.form} onSubmit={(e) => sendThread(e)}>
            <h4><FiMessageSquare /> New thread</h4>
            <input type="hidden" name="board" value={boardId} />
            <textarea placeholder="What's on your mind?" name="body" required />
            <FileUploader />
            <button type="submit">
                <FiCornerDownRight /> Send
            </button>
        </form>
    )
}

interface ThreadForm extends HTMLFormElement {
    board: HTMLInputElement
    body: HTMLInputElement
    aid1?: HTMLInputElement
    aid2?: HTMLInputElement
    aid3?: HTMLInputElement
    aid4?: HTMLInputElement
}

async function sendThread(e: FormEvent) {
    e.preventDefault()
    const target = e.target as ThreadForm

    const fd = new FormData()
    fd.append("board", target.board.value)
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

    const url = getBackendUrl("threads")
    const response = await fetch(url, options)
    if (response.ok) {
        const content = await response.json()
        Router.push(`/threads/${content.id}`)
    }
    else {
        alert('Something went wrong')
    }
}
