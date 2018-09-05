import { TopicLocationMap } from "./topic";

export type ArticleContentFormat = 'text' | 'md' | 'json';

export interface ArticleContent {
    id: string
    refId: string
    refType: ArticleContentRefType
    content: string
    format: ArticleContentFormat
    formatVersion?: number
    topicsMap?: TopicLocationMap
    expiresAt: number
    createdAt: string
    updatedAt?: string
}

export interface BuildArticleContentParams {
    refId: string
    refType: ArticleContentRefType
    content: string
    format: ArticleContentFormat
    formatVersion?: number
    topicsMap?: TopicLocationMap
    expiresAt?: number
    createdAt?: string
}

export type ArticleContentRefType = 'NEWS' | 'EVENT'

export type ArticleContentRef = {
    refId: string
    refType: ArticleContentRefType
}
