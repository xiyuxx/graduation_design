interface Article{
    id:number,
    father_id?:number,
    last_update:string,
    update_name:string,
    update_avatar?:string,
    title:string,
    content:string,
    children:Article[],
}