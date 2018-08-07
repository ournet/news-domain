
export interface News {
    id: string
    title: string
    summary: string
    lang: string
    country: string
    urlPath: string
    urlHost: string
    content?: string
    slug: string

    sourceId: string
    imageIds?: string[]
    videoId?: string
    topics?: NewsTopic[]

    createdAt: Date
    updatedAt?: Date
    publishedAt: Date
}

export interface NewsTopic {
    id: string
    name: string
    slug: string
    abbr?: string
}
