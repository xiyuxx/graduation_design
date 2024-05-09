import {WebviewWindow} from "@tauri-apps/api/window";
import {WINDOW_TYPES} from "../types/multiWindow.ts";

export const enter_workSpace = ()=> {
    const webview = new WebviewWindow('main',{
        "fullscreen": false,
        "resizable": true,
        "title": "SDA",
        "width": 1300,
        "height": 800,
        "center":true,
        "url": "/workStation"
    })
    webview.once('tauri://created',function (){
        const login_window = WebviewWindow.getByLabel('login')
        login_window?.close()
    })
    webview.once('tauri://error',function (e) {
        console.log(e)
    })
}

export const back_login = ()=> {
    const webview = new WebviewWindow('login',{
        "fullscreen": false,
        "resizable": true,
        "title": "Login",
        "center":true,
        "width": 400,
        "height": 660,
        "url": "/login"
    })
    webview.once('tauri://created',function (){
        const workSpace_window = WebviewWindow.getByLabel('main')
        workSpace_window?.close()
    })
    webview.once('tauri://error',function (e) {
        console.log(e)
    })
}

// 打开项目|测试库|协作空间|知识管理,
// 或者工作项|用例测试
export const open_project = (types:WINDOW_TYPES,logo:string)=>{
    if(types === WINDOW_TYPES.PROJECT){
        console.log("尝试创建项目详情页面")
        create_window("/project/",logo)
    }else if(types === WINDOW_TYPES.TEST){
        //TODO
    }else if(types === WINDOW_TYPES.WIKI){
        console.log("尝试创建空间详情页面")
        create_window("/wiki/",logo)
    }else if(types === WINDOW_TYPES.TOPIC){
        //TODO
    }else{
        //TODO
    }
}
export const create_window = (url_prefix:string,logo:string)=> {
    const webview = new WebviewWindow('project'+logo,{
        "fullscreen": false,
        "resizable": true,
        "title": logo,
        "center":true,
        "width": 1100,
        "height": 900,
        "url": url_prefix + logo
    })
    webview.once('tauri://created',function (){

    })
    webview.once('tauri://error',function (e) {
        console.log(e)
    })
}


// used in create window for new project/test hub/topic or topic
export const creator_window = (work_types:WINDOW_TYPES)=>{
    const webview = new WebviewWindow('creator'+work_types,{
        "fullscreen": false,
        "resizable": true,
        "title": "Creator",
        "center":true,
        "width": 600,
        "height": 400,
        "url": "/creator/"+work_types
    })
    webview.once('tauri://created',function (){

    })
    webview.once('tauri://error',function (e) {
        console.log(e)
    })
}

export const close_creator = (work_types:WINDOW_TYPES)=>{
    const workSpace_window = WebviewWindow.getByLabel('creator'+work_types)
    workSpace_window?.close()
}
