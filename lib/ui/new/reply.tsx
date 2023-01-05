import { FormEvent, useState } from "react"
import { FiX, FiCornerDownRight, FiMessageSquare } from "react-icons/fi"
import { getBackendUrl } from "lib/brain"
import { FileUploader } from "lib/ui"
import styles from "./common.module.css"

export function NewReplyForm({threadId, onSuccess, targets, setTargets}: {threadId: number, onSuccess: () => void, targets: number[], setTargets: (arg0: number[]) => void}) {
    // Used to reset the list of files after submit
    const [fileUploaderKey, setFileUploaderKey] = useState(1)
    
    const afterSubmit = () => {
        setTargets([])
        setFileUploaderKey(fk => fk + 1)
        onSuccess()
    }
    
    return (
        <form className={styles.form} onSubmit={(e) => sendReply(e, targets, afterSubmit)}>
            <h4><FiMessageSquare /> New reply</h4>
            <TargetControls targets={targets} setTargets={setTargets} />
            <input type="hidden" name="origin" value={threadId} />
            <textarea placeholder="What's on your mind?" name="body" required />
            <FileUploader key={fileUploaderKey} />
            <button type="submit">
                <FiCornerDownRight /> Send
            </button>
        </form>
    )
}

function TargetControls({targets, setTargets}: {targets: number[], setTargets: (arg0: number[]) => void}) {
    if (targets.length === 0) return <></>

    return (
        <div className={styles.targets}>
            {targets.map(target => (
                <div key={target}>
                    <div>Reply to #{target}</div>
                    <button onClick={() => setTargets(targets.filter(t => t != target))} type="button">
                        <FiX />
                    </button>
                </div>
            ))}
        </div>
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

async function sendReply(e: FormEvent, targets: number[], onSuccess: () => void) {
    e.preventDefault()
    const target = e.target as ReplyForm

    const fd = new FormData()
    fd.append("origin", target.origin.value)
    fd.append("body", target.body.value)

    for (const target of targets)
        fd.append("targets", target.toString())

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
    if (response.ok) {
        target.reset()
        onSuccess()
    }
    else {
        alert('Something went wrong')
    }
}
