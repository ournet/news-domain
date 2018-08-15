
import {
    Repository,
    RepositoryAccessOptions,
} from '@ournet/domain';

import {
    NewsEvent,
} from '../entities/event';

export interface EventRepository extends Repository<NewsEvent> {
    latest(params: LatestEventsQueryParams, options?: RepositoryAccessOptions<NewsEvent>): Promise<NewsEvent[]>
    latestByTopic(params: LatestEventsByTopicQueryParams, options?: RepositoryAccessOptions<NewsEvent>): Promise<NewsEvent[]>

    count(params: CountEventsQueryParams): Promise<number>
    countByTopic(params: CountEventsByTopicQueryParams): Promise<number>
}

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

export interface CountEventsQueryParams extends EventsQueryParams {

}

export interface CountEventsByTopicQueryParams extends CountEventsQueryParams {
    topicId: string
}
