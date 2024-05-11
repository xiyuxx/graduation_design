export interface Project {
    id:string,
    name:string,
    logo:string,
    description?:string,
    last_update:string,
    admin_name:string,
    if_star:boolean
}

export interface WorkItem {
    id:string,
    name:string,
    item_type?:string,
    create_time:string,
    father_item?:number,
    priority?:string,
    status:number,
    principal_name?:string,
    principal_avatar?:string,
    description:string
}

export interface Partner{
    id:string,
    position?:string,
    role:string,
    name:string,
    avatar?:string
}