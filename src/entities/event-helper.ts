
import { NEWS_EVENT_EXPIRE_DAYS } from "../config";
import { BuildNewsEventParams, NewsEvent } from "./event";
import { NewsHelper } from "./news-helper";
import { sha1, clearText } from "@ournet/domain";

export class EventHelper {

    static build(params: BuildNewsEventParams): NewsEvent {
        let slug = NewsHelper.slug(params.title).substr(0, 60);
        if (slug.endsWith('-')) {
            slug = slug.substr(0, slug.length - 1);
        }

        const createdAt = params.createdAt && new Date(params.createdAt) || new Date();
        const expiresAt = params.expiresAt || EventHelper.expiresAt(createdAt);
        const id = EventHelper.createId(params.country, params.lang, params.title, createdAt);

        if (params.videosIds && params.videosIds.length === 0) {
            delete params.videosIds;
        }
        if (params.quotesIds && params.quotesIds.length === 0) {
            delete params.quotesIds;
        }

        const event: NewsEvent = {
            id,
            title: params.title,
            summary: params.summary,
            source: params.source,
            slug,
            lang: params.lang,
            country: params.country,
            createdAt: createdAt.toISOString(),
            expiresAt,
            topics: params.topics,
            videosIds: params.videosIds,
            quotesIds: params.quotesIds,
            hasContent: params.hasContent,
            countImages: params.countImages,
            countNews: params.news.length,
            countQuotes: params.quotesIds && params.quotesIds.length || 0,
            countVideos: params.videosIds && params.videosIds.length || 0,
            countViews: 0,
            imageHost: params.imageHost,
            imageId: params.imageId,
            imageSourceId: params.imageSourceId,
            items: params.news,
            status: params.status,
        };

        return event;
    }

    static expiresAt(date: Date) {
        date = new Date(date);
        date.setDate(date.getDate() + NEWS_EVENT_EXPIRE_DAYS);
        return Math.floor(date.getTime() / 1000);
    }

    static createId(country: string, lang: string, title: string, date: Date) {
        const locale = EventHelper.formatIdLocale(country, lang);
        const titleHash = sha1(clearText(title.toLowerCase()));
        return `${titleHash.substr(0, 8)}${EventHelper.formatIdDate(date)}${locale}`;
    }

    static formatIdLocale(country: string, lang: string) {
        return `${country.trim()}${lang.trim()}`;
    }

    static formatIdDate(date: Date) {
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();

        return `${date.getUTCFullYear().toString().substr(2)}${month > 9 ? month : '0' + month}${day > 9 ? day : '0' + day}`;
    }

    static parseLocaleFromId(id: string) {
        return {
            country: id.substr(id.length - 4, 2),
            lang: id.substr(id.length - 2),
        };
    }
}
