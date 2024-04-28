export interface UserInfo {
    user_id:string,
    name:string,
    pwd:string,
    organization:string,
    org_name:string,
    phone?:string,
    email?:string,
    gender?:string,
    work_id?:string,
    avatar?:string,
    background?:string,
    create_time:string,
    role:number
}

export interface UserRegister{
    name:string,
    pwd:string,
    organization:string,
    phone:string
}

export interface UserLogin{
    login_key:string,
    pwd:string,
}

export interface UserEditor {
    name?:string,
    pwd?:string,
    phone?:string,
    gender?:string,
    email?:string,
    avatar?:string,
    background?:string,
    work_id?:string
}