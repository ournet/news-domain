
import {
    Repository,
    RepositoryAccessOptions,
} from '@ournet/domain';

import { NewsItem } from '../entities/news';

export interface NewsSearchParams {
    lang: string
    country: string
    q: string
    limit: number
    maxCreatedAt: Date
    minScore?: number
    type?: 'best_fields' | 'most_fields' | 'cross_fields' | 'phrase' | 'phrase_prefix'
}

export interface NewsRepository extends Repository<NewsItem> {
    search(params: NewsSearchParams, options?: RepositoryAccessOptions<NewsItem>): Promise<NewsItem[]>
    latest(params: LatestNewsQueryParams, options?: RepositoryAccessOptions<NewsItem>): Promise<NewsItem[]>
    latestBySource(params: LatestNewsBySourceQueryParams, options?: RepositoryAccessOptions<NewsItem>): Promise<NewsItem[]>
    latestByTopic(params: LatestNewsByTopicQueryParams, options?: RepositoryAccessOptions<NewsItem>): Promise<NewsItem[]>
    latestByEvent(params: LatestNewsByEventQueryParams, options?: RepositoryAccessOptions<NewsItem>): Promise<NewsItem[]>
}

export interface NewsQueryParams {
    lang: string
    country: string
    publishedAt?: Date
}

export interface LatestNewsQueryParams extends NewsQueryParams {
    limit: number
}

export interface LatestNewsBySourceQueryParams extends LatestNewsQueryParams {
    sourceId: string
}

export interface LatestNewsByTopicQueryParams extends LatestNewsQueryParams {
    topicId: string
}

export interface LatestNewsByEventQueryParams extends LatestNewsQueryParams {
    eventId: string
}

export interface CountNewsQueryParams extends NewsQueryParams {
    
}

export interface CountNewsBySourceQueryParams extends CountNewsQueryParams {
    sourceId: string
}

export interface CountNewsByTopicQueryParams extends CountNewsQueryParams {
    topicId: string
}

export interface CountNewsByEventQueryParams extends CountNewsQueryParams {
    eventId: string
}
