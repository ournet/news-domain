import { TopicLocationMap } from "./topic";

export interface ArticleContent {
    id: string
    refId: string
    refType: ArticleContentRefType
    content: string
    topicsMap?: TopicLocationMap
    expiresAt: number
    createdAt: string
    updatedAt?: string
}

export interface BuildArticleContentParams {
    refId: string
    refType: ArticleContentRefType
    content: string
    topicsMap?: TopicLocationMap
    expiresAt?: number
    createdAt?: string
}

export type ArticleContentRefType = 'NEWS' | 'EVENT'

export type ArticleContentRef = {
    refId: string
    refType: ArticleContentRefType
}
