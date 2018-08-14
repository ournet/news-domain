import {
    BuildArticleContentParams,
    ArticleContent,
    ArticleContentRefType,
    ArticleContentRef,
} from "./article-content";
import { NewsHelper } from "./news-helper";
import { EventHelper } from "./event-helper";

export class ArticleContentBuilder {
    static build(params: BuildArticleContentParams) {
        const createdAt = params.createdAt && new Date(params.createdAt) || new Date();
        let expiresAt = params.expiresAt as number;
        if (params.refType === 'NEWS') {
            expiresAt = expiresAt || NewsHelper.expiresAt(createdAt);
        } else if (params.refType === 'EVENT') {
            expiresAt = expiresAt || EventHelper.expiresAt(createdAt);
        } else {
            throw new Error(`Invalid refType: ${params.refType}`);
        }

        const id = ArticleContentBuilder.createId(params);

        const content: ArticleContent = {
            id,
            refId: params.refId,
            refType: params.refType,
            content: params.content,
            createdAt: createdAt.toISOString(),
            expiresAt,
        };

        return content;
    }

    static createId(ref: ArticleContentRef) {
        return `${ref.refType.trim().toLowerCase()}_${ref.refId.trim()}`;
    }

    static parseId(id: string) {
        const parts = id.split(/_/);
        if (parts.length !== 2) {
            throw new Error(`Invalid id: ${id}`);
        }
        const type = parts[0].toUpperCase();
        if (!['NEWS', 'EVENT'].includes(type)) {
            throw new Error(`Invalid id: ${id}`);
        }

        const ref: ArticleContentRef = {
            refType: type as ArticleContentRefType,
            refId: parts[1],
        };

        return ref;
    }
}
