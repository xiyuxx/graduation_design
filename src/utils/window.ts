import {WebviewWindow} from "@tauri-apps/api/window";
export const enter_workSpace = ()=> {
    const webview = new WebviewWindow('main',{
        "fullscreen": false,
        "resizable": true,
        "title": "SDA",
        "width": 1920,
        "height": 1080,
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
