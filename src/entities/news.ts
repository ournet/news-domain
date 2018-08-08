import { Topic, TopicLocationMap } from "./topic";

// export const NEWS_ID_REGEX: RegExp = /^[a-z0-9]{8}\d{6}[a-z]{4}$/;

export interface News {
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
    topicsLocation?: TopicLocationMap

    eventId?: string

    createdAt: Date
    updatedAt?: Date
    publishedAt: Date
    expiresAt: Date

    urlHash: string
    titleHash: string

    hasContent: boolean
}

export interface BuildNewsInfo {
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

    publishedAt?: Date
    createdAt?: Date
    expiresAt?: Date
}
