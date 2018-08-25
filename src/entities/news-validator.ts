import { EntityValidator, Joi } from "@ournet/domain";
import { NewsItem } from "./news";
import { NEWS_MAX_SUMMARY } from "../config";

export class NewsItemValidator extends EntityValidator<NewsItem> {
    constructor() {
        super({ createSchema, updateSchema });
    }
}

const schema = {
    id: Joi.string().regex(/^[a-f0-9]{32}$/),

    title: Joi.string().min(2).max(200).required(),
    slug: Joi.string().min(2).max(100).required(),

    lang: Joi.string().regex(/^[a-z]{2}$/),
    country: Joi.string().regex(/^[a-z]{2}$/),

    summary: Joi.string().min(100).max(NEWS_MAX_SUMMARY).truncate(true),
    urlPath: Joi.string().min(1).max(800),
    urlHost: Joi.string().min(4).max(100),

    sourceId: Joi.string().trim().min(2).max(50),
    imageIds: Joi.array().items(Joi.string().trim().min(2).max(50)).unique().empty(false),
    videoId: Joi.array().items(Joi.string().trim().min(2).max(25)).unique().empty(false),
    topics: Joi.array().items(Joi.object().keys({
        id: Joi.string().min(4).max(40).required(),
        name: Joi.string().min(2).max(200).required(),
        slug: Joi.string().min(2).max(200).required(),
        abbr: Joi.string().min(2).max(50),
        type: Joi.string().valid(['PERSON', 'ORG', 'PLACE', 'PRODUCT', 'WORK']),
    })).unique().min(1).max(10),

    eventId: Joi.string().regex(/^[a-z0-9]{18}$/),

    createdAt: Joi.string().isoDate(),
    updatedAt: Joi.string().isoDate(),
    publishedAt: Joi.string().isoDate(),
    expiresAt: Joi.date().timestamp().raw(),

    titleHash: Joi.string().regex(/^[a-f0-9]{32}$/),

    hasContent: Joi.boolean(),

    countViews: Joi.number().integer().min(0),
};

const createSchema = Joi.object().keys({
    id: schema.id.required(),

    title: schema.title.required(),
    slug: schema.slug.required(),

    lang: schema.lang.required(),
    country: schema.country.required(),

    summary: schema.summary.required(),

    urlPath: schema.urlPath.required(),
    urlHost: schema.urlHost.required(),

    sourceId: schema.sourceId.required(),
    imageIds: schema.imageIds,
    videoId: schema.videoId,
    topics: schema.topics.required(),

    eventId: schema.eventId,

    createdAt: schema.createdAt.required(),
    updatedAt: schema.updatedAt,
    publishedAt: schema.publishedAt.required(),
    expiresAt: schema.expiresAt.required(),

    titleHash: schema.titleHash.required(),

    hasContent: schema.hasContent.required(),

    countViews: schema.countViews.required(),
}).required();

const updateSchema = Joi.object().keys({
    id: schema.id.required(),
    set: Joi.object().keys({
        eventId: schema.eventId,

        updatedAt: schema.updatedAt,
        expiresAt: schema.expiresAt,

        countViews: schema.countViews,
    }).empty(false),
    delete: Joi.array().items(Joi.valid(['imagesIds', 'eventId'])).empty(false)
}).or('set', 'delete').required();
