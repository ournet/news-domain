import { Topic } from "./topic";

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

	items: NewsEventItem[]

	quotesIds?: string[]
	videosIds?: string[]
	imagesIds?: string[]

	status?: NewsEventStatus

	createdAt: string
	updatedAt?: string
	expiresAt: number

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
	publishedAt: string
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

	topics: Topic[]

	news: NewsEventItem[]

	quotesIds?: string[]
	videosIds?: string[]
	imagesIds?: string[]

	status?: NewsEventStatus

	createdAt?: string
	expiresAt?: number

	hasContent: boolean
}
