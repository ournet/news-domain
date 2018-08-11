
import {
    ReadRepository,
    WriteRepository,
    RepositoryAccessOptions,
} from '@ournet/domain';

import {
    NewsEvent,
} from '../entities/event';

export interface EventsQueryParams {
    lang: string
    country: string
    limit: number
}

export interface LatestEventsQueryParams extends EventsQueryParams {
    createdAt?: Date
}

export interface LatestEventsByTopicQueryParams extends LatestEventsQueryParams {
    topicId: string
}

export interface EventReadRepository extends ReadRepository<NewsEvent> {
    latest(params: LatestEventsQueryParams, options?: RepositoryAccessOptions<NewsEvent>): Promise<NewsEvent>
    latestByTopic(params: LatestEventsByTopicQueryParams, options?: RepositoryAccessOptions<NewsEvent>): Promise<NewsEvent>
}

export interface EventWriteRepository extends WriteRepository<NewsEvent> {
}

export interface EventRepository extends EventReadRepository, EventWriteRepository { }
