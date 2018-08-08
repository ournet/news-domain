
export interface ArticleContent {
    id: string
    content: string
    expiresAt: Date
    createdAt: Date
    updatedAt?: Date
}

export interface BuildArticleContentInfo {
    id: string
    content: string
    expiresAt?: Date
    createdAt?: Date
}
