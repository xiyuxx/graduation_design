import {defineStore} from "pinia";
import {ref} from "vue";
import {UserEditor, UserInfo, UserLogin, UserRegister} from "../types/user";

import {
    RegisterResult,
    RegisterSuccessResult,
    ReqResult,
    SingleEditResult,
    SingleEditSuccessResult
} from "../types/result";
import http from "../utils/axios.ts";
import {Body} from "@tauri-apps/api/http";
import {fetchAvatar} from "../utils/avatar.ts";


export const useUserStore = defineStore('user',()=>{
    const user_id = ref("");
    const user_name = ref("");
    const org_id = ref("");
    const org_name = ref("");

    const phone = ref("");
    const avatar = ref("");
    const background = ref("");
    const work_id = ref("");
    const gender = ref("");
    const email = ref("");
    const create_time = ref("")
    const role = ref(1)

    const if_req = ref(false);

    async function register(new_user:UserRegister){
        const body = Body.form({
            ...new_user
        })
        await http<ReqResult<RegisterResult>>('/user/register/create',{
            method:'POST',
            body
        }).then((req_info)=> {
            let data = req_info.data
            console.log("是否成功",data.success)
            if(data.success){
                let user_info = (data.data as RegisterSuccessResult).Success
                user_id.value = user_info.id;
                user_name.value = user_info.name
                org_id.value = user_info.org_id;
                org_name.value = user_info.org_name;
                role.value = 1;

                avatar.value = fetchAvatar(user_info.name)
                console.log("头像来源：",fetchAvatar(user_info.name))
                console.log("用户数据：",user_id.value,user_name.value)
                if_req.value = true;
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    async function login(login_key:UserLogin) {
        const body = Body.form({...login_key})
        await http<ReqResult<UserInfo>>('/user/login',{
            method:'POST',
            body
        }).then((req_info)=> {
            let data = req_info.data
            console.log("请求到的data:",data)

            if(data.success){
                if_req.value = true;

                let user_info = data.data
                user_id.value = user_info.user_id;
                user_name.value = user_info.name;
                org_id.value = user_info.organization;
                org_name.value = user_info.org_name;
                create_time.value = user_info.create_time;
                role.value = user_info.role;

                if(user_info.phone) {phone.value = user_info.phone}
                if(user_info.avatar){
                    avatar.value = user_info.avatar
                }else{
                    avatar.value = fetchAvatar(user_info.name)
                    console.log("头像来源：",fetchAvatar(user_info.name))
                }
                console.log("头像：",avatar.value)
                if(user_info.background) {background.value = user_info.background}
                if(user_info.gender) {gender.value = user_info.gender}
                if(user_info.email) {email.value = user_info.email}
                if(user_info.work_id) {work_id.value = user_info.work_id}
            }
        }).catch((err)=>{
            console.log("查无此人喔")
            console.log(err)
        })
    }

    async function update(user:UserEditor) {
        const body = Body.form({
            ...user
        })
        await http<ReqResult<SingleEditResult>>('/user/edit',{
            method:'POST',body
        }).then((req_info)=> {
            let data = req_info.data
            console.log("是否成功",data.success)
            if(data.success){
                return (data.data as SingleEditSuccessResult).Success
            }
        }).catch((err)=>{
            console.log(err)
            return "更新用户失败~"
        })
    }
    function if_login() {
        return if_req.value
    }
    function $reset(){
        user_id.value = "";
        user_name.value = "";
        org_id.value = "";
        org_name.value = "";

        phone.value = "";
        avatar.value = "";
        background.value = "";
        work_id.value = "";
        gender.value = "";
        email.value = "";
        create_time.value = ""

        if_req.value = false;
    }

    return {
        register,login,update,if_login,$reset,
        user_id,user_name,avatar,role
    }
} ,{persist:true})