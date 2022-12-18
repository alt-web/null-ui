import { createContext } from 'react'
import { AttachmentAPI } from "lib/brain"

interface MediaContextProps {
    attachments: AttachmentAPI[]
    setAttachments: (arg0: AttachmentAPI[]) => void
    aid: number | null
    setAid: (arg0: number|null) => void
}

const MediaContext = createContext<MediaContextProps>({
    attachments: [],
    setAttachments: () => {},
    aid: null,
    setAid: () => {}
})

export default MediaContext
