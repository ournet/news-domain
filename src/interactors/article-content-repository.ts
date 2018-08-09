
import {
    ReadRepository,
    WriteRepository,
} from '@ournet/domain';

import { ArticleContent } from '../entities/article-content';

export interface ArticleContentReadRepository extends ReadRepository<ArticleContent> {
}

export interface ArticleContentWriteRepository extends WriteRepository<ArticleContent> {

}

export interface ArticleContentRepository extends ArticleContentReadRepository, ArticleContentWriteRepository { }
