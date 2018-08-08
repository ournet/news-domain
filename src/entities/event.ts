import { Topic, TopicLocationMap } from "./topic";

export interface Event {
	id: string
	title: string
	slug: string
	summary: string

	source: EventSourceNews

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

	news: EventNews[]

	quotesIds?: string[]
	videosIds?: string[]

	status?: EventStatus

	createdAt: Date
	updatedAt?: Date
	expiresAt: Date

	hasContent: boolean
}

export type EventStatus = 'ADULT';

export interface EventSourceNews {
	id: string
	host: string
	path: string
	sourceId: string
}

export interface EventNews {
	id: string
	title: string
	sourceId: string
	host: string
	path: string
	publishedAt: Date
}
