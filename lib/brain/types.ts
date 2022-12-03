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
}
