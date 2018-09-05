import { EntityValidator, Joi } from "@ournet/domain";
import { ArticleContent } from "./article-content";

export class ArticleContentValidator extends EntityValidator<ArticleContent> {
    constructor() {
        super({ createSchema, updateSchema });
    }
}

const schema = {
    id: Joi.string().regex(/^(news|event)_[a-z0-9]{18,32}$/),
    refId: Joi.string().regex(/^[a-z0-9]{18,32}$/),
    refType: Joi.string().valid('NEWS', 'EVENT'),
    content: Joi.string().min(100),
    format: Joi.string().valid('text', 'md', 'json'),
    formatVersion: Joi.number().integer().min(0),
    topicsMap: Joi.object().pattern(/^[a-z0-9-]{4,40}$/,
        Joi.object().keys({
            index: Joi.number().min(0).required(),
            length: Joi.number().min(2).max(200).required(),
        })).min(1).max(25),

    createdAt: Joi.string().isoDate(),
    updatedAt: Joi.string().isoDate(),
    expiresAt: Joi.date().timestamp().raw(),
};

const createSchema = Joi.object().keys({
    id: schema.id.required(),
    refId: schema.refId.required(),
    refType: schema.refType.required(),
    content: schema.content.required(),
    format: schema.format.required(),
    formatVersion: schema.formatVersion,
    topicsMap: schema.topicsMap,

    createdAt: schema.createdAt.required(),
    updatedAt: schema.updatedAt,
    expiresAt: schema.expiresAt.required(),
}).required();

const updateSchema = Joi.object().keys({
    id: schema.id.required(),
    set: Joi.object().keys({
        content: schema.content,
        topicsMap: schema.topicsMap,
        updatedAt: schema.updatedAt,
        expiresAt: schema.expiresAt,
    }),
    delete: Joi.array().items(Joi.valid(['topicsMap']))
}).or('set', 'delete').required();
