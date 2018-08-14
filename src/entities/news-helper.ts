
import { sha1, normalizeUrl, clearText } from "@ournet/domain";
import { slugify } from 'transliteration';
import { BuildNewsParams, NewsItem } from "./news";
import { splitUrl } from "../helpers";
import { NEWS_ITEM_EXPIRE_DAYS } from "../config";

export class NewsHelper {

    static build(params: BuildNewsParams): NewsItem {
        const urlData = splitUrl(params.url);
        if (!urlData.host) {
            throw new Error(`Invalid news url:${params.url}`);
        }
        if (!urlData.path) {
            throw new Error(`Invalid news url:${params.url}`);
        }

        const normalizedUrl = normalizeUrl(params.url);
        const titleHash = NewsHelper.titleHash(params.title);
        const urlHash = NewsHelper.urlHash(normalizedUrl);
        let slug = NewsHelper.slug(params.title).substr(0, 60);
        if (slug.endsWith('-')) {
            slug = slug.substr(0, slug.length - 1);
        }

        const createdAt = params.createdAt && new Date(params.createdAt) || new Date();
        const expiresAt = params.expiresAt || NewsHelper.expiresAt(createdAt);
        const id = NewsHelper.createId(params.country, params.lang, urlHash, createdAt);
        const publishedAt = params.publishedAt || createdAt.toISOString();

        const news: NewsItem = {
            id,
            title: params.title,
            summary: params.summary,
            sourceId: params.sourceId,
            titleHash,
            urlHash,
            slug,
            lang: params.lang,
            country: params.country,
            createdAt: createdAt.toISOString(),
            expiresAt,
            publishedAt,
            imageIds: params.imageIds,
            topics: params.topics,
            topicsLocation: params.topicsLocation,
            videoId: params.videoId,
            urlHost: urlData.host,
            urlPath: urlData.path,
            hasContent: params.hasContent,
        };

        return news;
    }

    static expiresAt(date: Date) {
        date = new Date(date);
        date.setDate(date.getDate() + NEWS_ITEM_EXPIRE_DAYS);
        return Math.floor(date.getTime() / 1000);
    }

    static titleHash(title: string) {
        title = clearText(title.toLowerCase())
            .replace(/\s{2,}/g, ' ').trim();
        return sha1(title);
    }

    static urlHash(normalizedUrl: string) {
        return sha1(normalizedUrl.trim());
    }

    static slug(text: string) {
        return slugify(text.trim(), {
            lowercase: true,
            separator: '-',
        });
    }

    static createId(country: string, lang: string, urlHash: string, date: Date) {
        const locale = NewsHelper.formatIdLocale(country, lang);
        return `${urlHash.substr(0, 8)}${NewsHelper.formatIdDate(date)}${locale}`;
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
