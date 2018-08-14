
import {
    Repository,
} from '@ournet/domain';

import { ArticleContent } from '../entities/article-content';

export interface ArticleContentRepository extends Repository<ArticleContent> { }
