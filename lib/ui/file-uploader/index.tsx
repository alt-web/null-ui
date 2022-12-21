import { useState, ChangeEvent } from "react"
import { getBackendUrl } from "lib/brain"

export function FileUploader() {
    const [aids, setAids] = useState<number[]>([])

    const appendAid = (aid: number) => {
        if (aids.length < 4)
            setAids([...aids, aid])
    }

    return (
        <div>
            <h4>Upload files</h4>
            {aids.map((aid, index) =>
                <div key={aid}>
                    <input name={`aid${index+1}`} value={aid} readOnly />
                </div>
            )}
            {aids.length < 4 && <input type="file" onChange={(e) => uploadFile(e, appendAid)} /> }
        </div>
    )
}

async function uploadFile(e: ChangeEvent<HTMLInputElement>, appendAid: (arg0: number) => void) {
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

    appendAid(data.id)
    e.target.value = ""
}
