import {WebviewWindow} from "@tauri-apps/api/window";
export const enter_workSpace = ()=> {
    const webview = new WebviewWindow('main',{
        "fullscreen": false,
        "resizable": true,
        "title": "SDA",
        "width": 1300,
        "height": 900,
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
// export const start_work = (work_name:string)=>{}
