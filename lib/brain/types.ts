// boards
export interface BoardAPI {
    id: number
    code: string
    name: string
    description: string
}

// boards/id
export interface DetailedBoardAPI extends BoardAPI {
    threads: ThreadAPI[]
}

// boards/id
export interface ThreadAPI {
    id: number
    first_reply: ReplyAPI
    last_replies: ReplyAPI[]
}

// threads/id
export interface DetailedThreadAPI {
    id: number
    replies: ReplyAPI[]
}

// threads/id
export interface ReplyAPI {
    id: number
    body: string
    created_at: string
    targets: number[]
    attachments: AttachmentAPI[]
}

// attachments
export interface AttachmentAPI {
    id: number
    cid: string
    name: string
    mimetype: string
    size: number
    width: number | null
    height: number | null
    duration: number | null
    preview: PreviewAPI | null
}

// Mini-attachment for audio and video files
export interface PreviewAPI {
    id: number
    cid: string
}
