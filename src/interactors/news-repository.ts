
import {
    ReadRepository,
    WriteRepository,
} from '@ournet/domain';

import { News } from '../entities/news';

export interface NewsReadRepository extends ReadRepository<News> {

}

export interface NewsWriteRepository extends WriteRepository<News> {

}

export interface NewsRepository extends NewsReadRepository, NewsWriteRepository { }
