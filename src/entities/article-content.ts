
export interface ArticleContent {
    id: string
    refId: string
    refType: ArticleContentRefType
    content: string
    expiresAt: Date
    createdAt: Date
    updatedAt?: Date
}

export interface BuildArticleContentParams {
    refId: string
    refType: ArticleContentRefType
    content: string
    expiresAt?: Date
    createdAt?: Date
}

export type ArticleContentRefType = 'NEWS' | 'EVENT'

export type ArticleContentRef = {
    id: string
    type: ArticleContentRefType
}
