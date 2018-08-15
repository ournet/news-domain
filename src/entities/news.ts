import { Topic, TopicLocationMap } from "./topic";

export interface NewsItem {
    id: string
    title: string
    summary: string
    lang: string
    country: string
    urlPath: string
    urlHost: string
    slug: string

    sourceId: string
    imageIds?: string[]
    videoId?: string
    topics?: Topic[]

    eventId?: string

    createdAt: string
    updatedAt?: string
    publishedAt: string
    expiresAt: number

    urlHash: string
    titleHash: string

    hasContent: boolean

    countViews: number
}

export interface BuildNewsParams {
    title: string
    summary: string
    lang: string
    country: string
    url: string

    sourceId: string
    imageIds?: string[]
    videoId?: string
    topics?: Topic[]
    topicsLocation?: TopicLocationMap

    hasContent: boolean

    publishedAt?: string
    createdAt?: string
    expiresAt?: number
}
