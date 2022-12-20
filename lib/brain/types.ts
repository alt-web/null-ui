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
    body: string
    created_at: string
    attachments: AttachmentAPI[]
}

// threads/id
export interface DetailedThreadAPI extends ThreadAPI {
    replies: ReplyAPI[]
}

// threads/id
export interface ReplyAPI {
    id: number
    body: string
    created_at: string
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
    length: number | null
}
