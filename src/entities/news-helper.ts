
import { TextHelper, sha1, normalizeUrl } from "@ournet/domain";
import { slugify } from 'transliteration';
import { BuildNewsInfo, News } from "./news";
import { splitUrl } from "../helpers";

export class NewsHelper {

    static build(info: BuildNewsInfo): News {
        const urlData = splitUrl(info.url);
        if (!urlData.host) {
            throw new Error(`Invalid news url:${info.url}`);
        }
        if (!urlData.path) {
            throw new Error(`Invalid news url:${info.url}`);
        }

        const normalizedUrl = normalizeUrl(info.url);
        const titleHash = NewsHelper.titleHash(info.title);
        const urlHash = NewsHelper.urlHash(normalizedUrl);
        let slug = NewsHelper.slug(info.title).substr(0, 60);
        if (slug.endsWith('-')) {
            slug = slug.substr(0, slug.length - 1);
        }

        const createdAt = new Date();
        const id = NewsHelper.createId(info.country, info.lang, urlHash, createdAt);

        const news: News = {
            id,
            title: info.title,
            summary: info.summary,
            sourceId: info.sourceId,
            titleHash,
            urlHash,
            slug,
            content: info.content,
            lang: info.lang,
            country: info.country,
            createdAt,
            imageIds: info.imageIds,
            publishedAt: info.publishedAt || createdAt,
            topics: info.topics,
            topicsLocation: info.topicsLocation,
            videoId: info.videoId,
            urlHost: urlData.host,
            urlPath: urlData.path,
        };

        return news;
    }

    static titleHash(title: string) {
        title = TextHelper.removeSymbols(title.toLowerCase())
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
        date = date || new Date();
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
}
