
import {
    ReadRepository,
    WriteRepository,
    RepositoryAccessOptions,
} from '@ournet/domain';

import { News } from '../entities/news';

export interface NewsSearchParams {
    lang: string
    country: string
    q: string
    limit: number
    maxCreatedAt: Date
    minScore?: number
    type?: 'best_fields' | 'most_fields' | 'cross_fields' | 'phrase' | 'phrase_prefix'
}

export interface NewsQueryParams {
    lang: string
    country: string
    limit: number
}

export interface LatestNewsQueryParams extends NewsQueryParams {
    lastPublishedAt?: Date
}

export interface LatestNewsBySourceQueryParams extends NewsQueryParams {
    lastPublishedAt?: Date
    sourceId: string
}

export interface LatestNewsByTopicQueryParams extends NewsQueryParams {
    lastPublishedAt?: Date
    topicId: string
}

export interface LatestNewsByEventQueryParams extends NewsQueryParams {
    lastPublishedAt?: Date
    eventId: string
}

export interface NewsReadRepository extends ReadRepository<News> {
    search(params: NewsSearchParams, options?: RepositoryAccessOptions<News>): Promise<News>
    latest(params: LatestNewsQueryParams, options?: RepositoryAccessOptions<News>): Promise<News>
    latestBySource(params: LatestNewsBySourceQueryParams, options?: RepositoryAccessOptions<News>): Promise<News>
    latestByTopic(params: LatestNewsByTopicQueryParams, options?: RepositoryAccessOptions<News>): Promise<News>
    latestByEvent(params: LatestNewsByEventQueryParams, options?: RepositoryAccessOptions<News>): Promise<News>
}

export interface NewsWriteRepository extends WriteRepository<News> {

}

export interface NewsRepository extends NewsReadRepository, NewsWriteRepository { }
