import { JoiEntityValidator } from "@ournet/domain";
import { NewsItem } from "./news";
import { NEWS_MAX_SUMMARY_LENGTH, NEWS_MIN_SUMMARY_LENGTH } from "../config";
export const NEWS_ID_REGEX = /^[a-f0-9]{32}$/;

import Joi = require("joi");

export class NewsItemValidator extends JoiEntityValidator<NewsItem> {
  constructor() {
    super({ createSchema, updateSchema });
  }
}

const schema = {
  id: Joi.string().regex(NEWS_ID_REGEX),

  title: Joi.string().min(2).max(200).truncate(true).required(),
  slug: Joi.string().min(2).max(100).required(),

  lang: Joi.string().regex(/^[a-z]{2}$/),
  country: Joi.string().regex(/^[a-z]{2}$/),

  summary: Joi.string()
    .min(NEWS_MIN_SUMMARY_LENGTH)
    .max(NEWS_MAX_SUMMARY_LENGTH)
    .truncate(true),
  urlPath: Joi.string().min(1).max(800),
  urlHost: Joi.string().min(4).max(100),

  sourceId: Joi.string().trim().min(2).max(50),
  imagesIds: Joi.array()
    .items(Joi.string().trim().min(16).max(40))
    .unique()
    .empty(false),
  videoId: Joi.string().trim().min(2).max(40),
  topics: Joi.array()
    .items(
      Joi.object().keys({
        id: Joi.string().min(4).max(40).required(),
        name: Joi.string().min(2).max(200).required(),
        slug: Joi.string().min(2).max(200).required(),
        abbr: Joi.string().min(2).max(50),
        type: Joi.string().valid([
          "PERSON",
          "ORG",
          "PLACE",
          "PRODUCT",
          "WORK",
          "EVENT"
        ])
      })
    )
    .unique()
    .min(1)
    .max(10),

  quotesIds: Joi.array()
    .items(Joi.string().min(5).max(40))
    .unique()
    .min(1)
    .max(10),

  eventId: Joi.string().regex(/^[a-z0-9]{18}$/),

  createdAt: Joi.string().isoDate(),
  updatedAt: Joi.string().isoDate(),
  publishedAt: Joi.string().isoDate(),
  expiresAt: Joi.date().timestamp().raw(),

  titleHash: Joi.string().regex(NEWS_ID_REGEX),

  hasContent: Joi.boolean(),

  countViews: Joi.number().integer().min(0),
  countQuotes: Joi.number().integer().min(0)
};

const createSchema = Joi.object()
  .keys({
    id: schema.id.required(),

    title: schema.title.required(),
    slug: schema.slug.required(),

    lang: schema.lang.required(),
    country: schema.country.required(),

    summary: schema.summary.required(),

    urlPath: schema.urlPath.required(),
    urlHost: schema.urlHost.required(),

    sourceId: schema.sourceId.required(),
    imagesIds: schema.imagesIds,
    videoId: schema.videoId,
    topics: schema.topics.required(),
    quotesIds: schema.quotesIds,

    eventId: schema.eventId,

    createdAt: schema.createdAt.required(),
    updatedAt: schema.updatedAt,
    publishedAt: schema.publishedAt.required(),
    expiresAt: schema.expiresAt.required(),

    titleHash: schema.titleHash.required(),

    hasContent: schema.hasContent.required(),

    countViews: schema.countViews.required(),
    countQuotes: schema.countQuotes.required()
  })
  .required();

const updateSchema = Joi.object()
  .keys({
    id: schema.id.required(),
    set: Joi.object()
      .keys({
        eventId: schema.eventId,

        updatedAt: schema.updatedAt,
        expiresAt: schema.expiresAt,

        countViews: schema.countViews
      })
      .empty(false),
    delete: Joi.array()
      .items(Joi.valid(["imagesIds", "eventId", "videoId"]))
      .empty(false)
  })
  .or("set", "delete")
  .required();
