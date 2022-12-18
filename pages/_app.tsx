import '../styles/globals.css'
import { MediaViewer } from "lib/ui"
import { AttachmentAPI } from "lib/brain"
import MediaContext from "lib/media-context"
import { useState } from "react"
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    const [ attachments, setAttachments] = useState<AttachmentAPI[]>([])
    const [ aid, setAid ] = useState<number|null>(null)
    return (
        <MediaContext.Provider value={{
            attachments,
            setAttachments: (a: AttachmentAPI[]) => setAttachments(a),
            aid,
            setAid: (a: number|null) => setAid(a) }}>
            <MediaViewer />
            <Component {...pageProps} />
        </MediaContext.Provider>
    )
}
