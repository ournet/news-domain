
export const NEWS_ID_REGEX: RegExp = /^[a-z0-9]{8}\d{6}[a-z]{4}$/;

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
    topicsLocation?: NewsTopicLocationMap

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

export type NewsTopicLocationMap = {
    [key: string]: {
        index: number
        length: number
    }
}

export interface BuildNewsInfo {
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
    topicsLocation?: NewsTopicLocationMap

    publishedAt?: Date
}
