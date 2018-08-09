
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
    minScore?: number
    type?: 'best_fields' | 'most_fields' | 'cross_fields' | 'phrase' | 'phrase_prefix'
}

export interface NewsReadRepository extends ReadRepository<News> {
    search(params: NewsSearchParams, options?: RepositoryAccessOptions<News>): Promise<News>
}

export interface NewsWriteRepository extends WriteRepository<News> {

}

export interface NewsRepository extends NewsReadRepository, NewsWriteRepository { }
