import { Topic, TopicLocationMap } from "./topic";

export interface NewsEvent {
	id: string
	title: string
	slug: string
	summary: string

	source: NewsEventSource

	lang: string
	country: string
	imageId: string
	imageHost: string
	imageSourceId: string

	countNews: number
	countViews: number
	countQuotes: number
	countVideos: number
	countImages: number

	topics: Topic[]
	topicsLocation?: TopicLocationMap

	items: NewsEventItem[]

	quotesIds?: string[]
	videosIds?: string[]

	status?: NewsEventStatus

	createdAt: Date
	updatedAt?: Date
	expiresAt: Date

	hasContent: boolean
}

export type NewsEventStatus = 'ADULT';

export interface NewsEventSource {
	id: string
	host: string
	path: string
	sourceId: string
}

export interface NewsEventItem {
	id: string
	title: string
	sourceId: string
	host: string
	path: string
	publishedAt: Date
}

export interface BuildNewsEventParams {
	title: string
	summary: string

	source: NewsEventSource

	lang: string
	country: string
	imageId: string
	imageHost: string
	imageSourceId: string

	countImages: number

	topics: Topic[]
	topicsLocation?: TopicLocationMap

	news: NewsEventItem[]

	quotesIds?: string[]
	videosIds?: string[]

	status?: NewsEventStatus

	createdAt?: Date
	expiresAt?: Date

	hasContent: boolean
}
