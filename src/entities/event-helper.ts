
import { EVENT_EXPIRE_DAYS } from "../config";
import { BuildEventParams, Event } from "./event";
import { NewsHelper } from "./news-helper";

export class EventHelper {

    static build(params: BuildEventParams): Event {
        let slug = NewsHelper.slug(params.title).substr(0, 60);
        if (slug.endsWith('-')) {
            slug = slug.substr(0, slug.length - 1);
        }

        const createdAt = params.createdAt || new Date();
        const expiresAt = params.expiresAt || EventHelper.createExpiresAt(createdAt);
        const id = params.source.id;

        const event: Event = {
            id,
            title: params.title,
            summary: params.summary,
            source: params.source,
            slug,
            lang: params.lang,
            country: params.country,
            createdAt,
            expiresAt,
            topics: params.topics,
            topicsLocation: params.topicsLocation,
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
            news: params.news,
            status: params.status,
        };

        return event;
    }

    static createExpiresAt(date: Date) {
        date = new Date(date);
        date.setDate(date.getDate() + EVENT_EXPIRE_DAYS);
        return date;
    }
}
