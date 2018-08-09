import { BuildArticleContentParams, ArticleContent, ArticleContentRefType, ArticleContentRef } from "./article-content";
import { NewsHelper } from "./news-helper";
import { EventHelper } from "./event-helper";

export class ArticleContentBuilder {
    static build(params: BuildArticleContentParams) {
        const createdAt = params.createdAt || new Date();
        let expiresAt = params.expiresAt as Date;
        if (params.refType === 'NEWS') {
            expiresAt = expiresAt || NewsHelper.createExpiresAt(createdAt);
        } else if (params.refType === 'EVENT') {
            expiresAt = expiresAt || EventHelper.createExpiresAt(createdAt);
        } else {
            throw new Error(`Invalid refType: ${params.refType}`);
        }

        const id = ArticleContentBuilder.createId({ id: params.refId, type: params.refType });

        const content: ArticleContent = {
            id,
            refId: params.refId,
            refType: params.refType,
            content: params.content,
            createdAt,
            expiresAt,
        };

        return content;
    }

    static createId(ref: ArticleContentRef) {
        return `${ref.type.trim().toLowerCase()}-${ref.type.trim()}`;
    }

    static parseId(id: string) {
        const parts = id.split(/-/);
        if (parts.length !== 2) {
            throw new Error(`Invalid id: ${id}`);
        }
        const type = parts[0].toUpperCase();
        if (!['NEWS', 'EVENT'].includes(type)) {
            throw new Error(`Invalid id: ${id}`);
        }

        const ref: ArticleContentRef = {
            type: type as ArticleContentRefType,
            id: parts[1],
        };

        return ref;
    }
}
