
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

    urlHash: string
    titleHash: string
}

export interface NewsTopic {
    id: string
    name: string
    slug: string
    abbr?: string
}

export interface RequiredNewsInfo {
    title: string
    summary: string
    lang: string
    country: string
    url: string
    content?: string

    sourceId: string
    imageIds?: string[]
    videoId?: string
    topics?: NewsTopic[]

    publishedAt?: Date
}
