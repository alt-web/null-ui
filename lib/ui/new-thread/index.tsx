import { FormEvent } from "react"
import styles from "./index.module.css"

export function NewThreadForm({boardId}: {boardId: number}) {
    return (
        <form className={styles.form} onSubmit={(e) => sendThread(e)}>
            <input type="hidden" name="board" value={boardId} />
            <textarea placeholder="Body" name="body" required />
            <button type="submit">Отправить</button>
        </form>
    )
}

interface ThreadForm extends HTMLFormElement {
    board: HTMLInputElement
    body: HTMLInputElement
}

async function sendThread(e: FormEvent) {
    e.preventDefault()
    const target = e.target as ThreadForm

    const fd = new FormData()
    fd.append("board", target.board.value)
    fd.append("body", target.body.value)

    const options = {
        method: "POST",
        body: fd
    }

    const url = "http://localhost:8000/threads/"
    const response = await fetch(url, options)
    if (response.status >= 200 && response.status < 300)
        alert('Thread was created')
    else
        alert('Something went wrong')
}
