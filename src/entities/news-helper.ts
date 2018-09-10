
import { normalizeUrl, clearText, md5 } from "@ournet/domain";
import { slugify } from 'transliteration';
import { BuildNewsParams, NewsItem } from "./news";
import { splitUrl, truncateAt } from "../helpers";
import { NEWS_ITEM_EXPIRE_DAYS, NEWS_MAX_SUMMARY_LENGTH } from "../config";

export class NewsHelper {

    static build(params: BuildNewsParams): NewsItem {
        const urlData = splitUrl(params.url);
        if (!urlData.host) {
            throw new Error(`Invalid news url:${params.url}`);
        }
        if (!urlData.path) {
            throw new Error(`Invalid news url:${params.url}`);
        }


        const titleHash = NewsHelper.titleHash(params.title);
        let slug = NewsHelper.slug(params.title).substr(0, 60);
        if (slug.endsWith('-')) {
            slug = slug.substr(0, slug.length - 1);
        }

        const createdAt = params.createdAt && new Date(params.createdAt) || new Date();
        const expiresAt = params.expiresAt || NewsHelper.expiresAt(createdAt);
        const normalizedUrl = normalizeUrl(params.url);
        const id = md5(normalizedUrl);
        const publishedAt = params.publishedAt || createdAt.toISOString();
        const countViews = 0;

        if (params.imagesIds && params.imagesIds.length === 0) {
            delete params.imagesIds;
        }
        if (params.quotesIds && params.quotesIds.length === 0) {
            delete params.quotesIds;
        }

        const news: NewsItem = {
            countQuotes: params.quotesIds && params.quotesIds.length || 0,
            country: params.country,
            countViews,
            createdAt: createdAt.toISOString(),
            expiresAt,
            hasContent: params.hasContent,
            id,
            imagesIds: params.imagesIds,
            lang: params.lang,
            publishedAt,
            quotesIds: params.quotesIds,
            slug,
            sourceId: params.sourceId,
            summary: params.summary,
            title: params.title,
            titleHash,
            topics: params.topics,
            urlHost: urlData.host,
            urlPath: urlData.path,
            videoId: params.videoId,
        };

        news.summary = truncateAt(news.summary, NEWS_MAX_SUMMARY_LENGTH);

        return news;
    }

    static expiresAt(date: Date) {
        date = new Date(date);
        date.setDate(date.getDate() + NEWS_ITEM_EXPIRE_DAYS);
        return Math.floor(date.getTime() / 1000);
    }

    static titleHash(title: string) {
        title = clearText(title.toLowerCase());
        return md5(title);
    }

    static slug(text: string) {
        return slugify(text.trim().toLowerCase(), {
            lowercase: true,
            separator: '-',
        });
    }
}
