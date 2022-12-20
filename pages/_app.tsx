import '../styles/globals.css'
import { MediaViewer } from "lib/ui"
import { AttachmentAPI } from "lib/brain"
import MediaContext from "lib/media-context"
import { useState } from "react"
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: AppProps) {
    const [ attachments, setAttachments] = useState<AttachmentAPI[]>([])
    const [ aid, setAid ] = useState<number|null>(null)
    return (
        <MediaContext.Provider value={{
            attachments,
            setAttachments: (a: AttachmentAPI[]) => setAttachments(a),
            aid,
            setAid: (a: number|null) => setAid(a) }}>
            <SWRConfig
                value={{
                    refreshInterval: 15000,
                    fetcher: (url) => fetch(url).then((res) => res.json()),
                }}>
                <MediaViewer />
                <Component {...pageProps} />
            </SWRConfig>
        </MediaContext.Provider>
    )
}
