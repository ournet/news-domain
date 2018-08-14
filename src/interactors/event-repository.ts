
import {
    Repository,
    RepositoryAccessOptions,
} from '@ournet/domain';

import {
    NewsEvent,
} from '../entities/event';

export interface EventsQueryParams {
    lang: string
    country: string
    createdAt?: Date
}

export interface LatestEventsQueryParams extends EventsQueryParams {
    limit: number
}

export interface LatestEventsByTopicQueryParams extends LatestEventsQueryParams {
    topicId: string
}

export interface EventRepository extends Repository<NewsEvent> {
    latest(params: LatestEventsQueryParams, options?: RepositoryAccessOptions<NewsEvent>): Promise<NewsEvent[]>
    latestByTopic(params: LatestEventsByTopicQueryParams, options?: RepositoryAccessOptions<NewsEvent>): Promise<NewsEvent[]>
}
