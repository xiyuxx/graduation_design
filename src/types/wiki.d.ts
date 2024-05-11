export interface Article extends ArticleGetter{
    children:Article[],
}

export interface ArticleGetter{
    id:number,
    father_id?:number,
    last_update:string,
    update_name:string,
    update_avatar?:string,
    title:string,
    content:string,
}

export interface ArticleSetter{
    title:string,
    content:string,
    update_id:string
    father_id:number,
}