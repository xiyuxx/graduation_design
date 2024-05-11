export interface Reply {
    id:number,
    content:string,
    create_time:string,
    user_name:string,
    user_avatar?:string
}

export interface IComment {
    id:number,
    content:string,
    create_time:string,
    user_name:string,
    user_avatar?:string,
    reply_count:number,
    replies:Reply[],
    show_reply:boolean,
}

export interface Discuss {
    id:number,
    title:string,
    last_update:string,
    user_name:string,
    user_avatar?:string,
    comment_count:number,
}