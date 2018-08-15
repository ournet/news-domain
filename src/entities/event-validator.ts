import { EntityValidator, Joi } from "@ournet/domain";
import { NewsEvent } from "./event";

export class EventValidator extends EntityValidator<NewsEvent> {
    constructor() {
        super({ createSchema, updateSchema });
    }
}

const schema = {
    id: Joi.string().regex(/^[a-z0-9]{18}$/),

    title: Joi.string().min(2).max(200),
    slug: Joi.string().min(2).max(100),

    lang: Joi.string().regex(/^[a-z]{2}$/),
    country: Joi.string().regex(/^[a-z]{2}$/),

    summary: Joi.string().min(100).max(600).truncate(true),
    source: Joi.object().keys({
        path: Joi.string().min(1).max(500).required(),
        host: Joi.string().min(4).max(100).required(),
        id: Joi.string().regex(/^[a-z0-9]{18}$/).required(),
        sourceId: Joi.string().trim().min(2).max(50).required(),
    }),

    imageId: Joi.string().trim().min(16).max(40),
    imageHost: Joi.string().trim().min(4).max(100),
    imageSourceId: Joi.string().trim().min(2).max(50),

    countNews: Joi.number().integer().min(3).max(1000),
    countViews: Joi.number().integer().min(0),
    countQuotes: Joi.number().integer().min(0).max(1000),
    countVideos: Joi.number().integer().min(0).max(1000),
    countImages: Joi.number().integer().min(1).max(1000),

    topics: Joi.array().items(Joi.object().keys({
        id: Joi.string().min(4).max(40).required(),
        name: Joi.string().min(2).max(200).required(),
        slug: Joi.string().min(2).max(200).required(),
        abbr: Joi.string().min(2).max(50),
        type: Joi.string().valid(['PERSON', 'ORG', 'PLACE', 'PRODUCT', 'WORK']),
    })).unique().min(1).max(6),

    items: Joi.array().items(Joi.object().keys({
        title: Joi.string().min(2).max(200).required(),
        path: Joi.string().min(1).max(500).required(),
        host: Joi.string().min(4).max(100).required(),
        id: Joi.string().regex(/^[a-f0-9]{32}$/).required(),
        sourceId: Joi.string().trim().min(2).max(50).required(),
    })).min(1).max(10).unique(),

    quotesIds: Joi.array().items(Joi.string().trim().min(2).max(40)).unique().min(1).max(50),
    videosIds: Joi.array().items(Joi.string().trim().min(2).max(40)).unique().min(1).max(50),

    status: Joi.string().valid(['ADULT']),

    createdAt: Joi.string().isoDate(),
    updatedAt: Joi.string().isoDate(),
    expiresAt: Joi.date().timestamp().raw(),

    hasContent: Joi.boolean(),
};

const createSchema = Joi.object().keys({
    id: schema.id.required(),

    title: schema.title.required(),
    slug: schema.slug.required(),

    lang: schema.lang.required(),
    country: schema.country.required(),

    summary: schema.summary.required(),
    source: schema.source.required(),

    imageId: schema.imageId.required(),
    imageHost: schema.imageHost.required(),
    imageSourceId: schema.imageSourceId.required(),

    countNews: schema.countNews.required(),
    countViews: schema.countViews.required(),
    countQuotes: schema.countQuotes.required(),
    countVideos: schema.countVideos.required(),
    countImages: schema.countImages.required(),

    topics: schema.topics.required(),

    items: schema.items.required(),

    quotesIds: schema.quotesIds,
    videosIds: schema.videosIds,

    status: schema.status,

    createdAt: schema.createdAt.required(),
    updatedAt: schema.updatedAt,
    expiresAt: schema.expiresAt.required(),

    hasContent: schema.hasContent.required(),
}).required();

const updateSchema = Joi.object().keys({
    id: schema.id.required(),
    set: Joi.object().keys({
        title: schema.title,
        summary: schema.summary,
        source: schema.source,

        imageId: schema.imageId,
        imageHost: schema.imageHost,
        imageSourceId: schema.imageSourceId,

        countNews: schema.countNews,
        countViews: schema.countViews,
        countQuotes: schema.countQuotes,
        countVideos: schema.countVideos,
        countImages: schema.countImages,

        topics: schema.topics,

        items: schema.items,

        quotesIds: schema.quotesIds,
        videosIds: schema.videosIds,

        status: schema.status,

        updatedAt: schema.updatedAt,
        expiresAt: schema.expiresAt,

        hasContent: schema.hasContent,
    }),
    delete: Joi.array().items(Joi.valid(['status', 'quotesIds', 'videosIds']))
}).or('set', 'delete').required();
