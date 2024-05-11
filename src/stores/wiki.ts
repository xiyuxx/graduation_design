import {defineStore} from "pinia";
import {reactive,ref} from "vue";
import {Project} from "../types/project";
import {
    AllArticleResult,
    AllProjectResult, ArticleCollector,
    ProjectCollector,
    ReqResult,
    SingleEditResult,
} from "../types/result";
import http from "../utils/axios.ts";
import {formatDateTime} from "../utils/time.ts";
import {Body} from "@tauri-apps/api/http";
import { ArticleGetter} from "../types/wiki";
import qs from "qs";


export const useWikiStore = defineStore('wiki',()=>{

    const spaces = reactive<Project[]>([])
    const star_spaces = reactive<Project[]>([])
    const show_spaces = reactive<Project[]>([])

    const show_articles = reactive<ArticleGetter[]>([])
    const current_articles = reactive<ArticleGetter[]>([])
    const current_space = ref<Project>()

    const if_req = ref(false)
    async function get_all(user_id:string){
        if(!if_req.value){
            if_req.value = true
            await http<ReqResult<AllProjectResult>>('/wiki/get_wiki',{
                method:'GET',
                params:{
                    id:user_id
                }
            }).then((req_info)=>{
                let data = req_info.data
                console.log("请求所有空间数据")
                if(data.success){
                    let project_info = (data.data as ProjectCollector).collector

                    for (let i = 0; i < project_info.length; i++) {
                        project_info[i].last_update = formatDateTime(project_info[i].last_update)
                        spaces.push(project_info[i])
                        show_spaces.push(project_info[i])
                        if(project_info[i].if_star){
                            star_spaces.push(project_info[i])
                        }
                    }
                    console.log(spaces)
                }
            }).catch(err=>{
                console.log(err)
            })
    }
    }
    async function update(user_id:string){
        await http<ReqResult<AllProjectResult>>('/wiki/get_wiki',{
            method:'GET',
            params:{
                id:user_id
            }
        }).then((req_info)=>{
            let data = req_info.data
            console.log("请求所有空间数据")
            if(data.success){
                let project_info = (data.data as ProjectCollector).collector
                spaces.splice(0,spaces.length)
                show_spaces.splice(0,show_spaces.length)
                star_spaces.splice(0,star_spaces.length)
                for (let i = 0; i < project_info.length; i++) {
                        project_info[i].last_update = formatDateTime(project_info[i].last_update)
                        spaces.push(project_info[i])
                        show_spaces.push(project_info[i])
                        if(project_info[i].if_star){
                            star_spaces.push(project_info[i])
                        }
                    }
                    console.log(spaces)
                }
            }).catch(err=>{
                console.log(err)
            })
    }
    async function handle_star(star:string,pro_id:string,user_id:string) {
        const body = Body.form({
            star,
            id:pro_id,
            userId:user_id
        })
        console.log(body)
        await http<ReqResult<SingleEditResult>>('/wiki/set_star',{
            method:'POST',
            body
        }).then((req_info)=>{
            if(req_info.data.success){
                update_wiki_star(pro_id)
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    function get_spaces_length(){
        return spaces.length
    }
    function update_wiki_star(pro_id:string) {
        console.log("更新wiki星标")
        let pro = spaces.find(pro => pro.id === pro_id)
        if (pro) {
            pro.if_star = !pro.if_star
            if (pro.if_star) {
                star_spaces.push(pro)
            } else {
                let index = star_spaces.findIndex(pro => pro.id === pro_id)
                if (index !== -1) {
                    star_spaces.splice(index, 1)
                }
            }
        }
    }
    async function create(name:string,logo:string,organization:string,userId:string,if_private = false){
        const body = Body.form({
            name,logo,organization,userId,private:if_private.toString()
        })
        await http<ReqResult<SingleEditResult>>('/wiki/set_wiki',{
            method:'POST',
            body
        }).then((req_info)=>{
            if(req_info.data.success){
                return true
            }
        }).catch((err)=>{
            console.log(err)
            return false
        })
    }
    // TODO create_article 和 set_article 应该合并在一起，两者区别仅在id是否存在
    // 新建文章
    async function create_article(wiki_id:string,title:string,content:string,update_id:string,
                                  father_id?:string){
        let body;
        if (father_id !== undefined) {
            body = Body.form({
                wiki_id,title,content,update_id,father_id
            })
        }else{
            body = Body.form({
                wiki_id,title,content,update_id,father_id:"0"
            })
        }
        await http<ReqResult<SingleEditResult>>("/wiki/set",{
            method:'POST',
            body
        }).then((req_info)=>{
            if(req_info.data.success){
                return true
            }
        }).catch((err)=>{
            console.log(err)
            return false
        })
    }

    // 修改文章
    async function set_article(wiki_id:string,id:string,title:string,content:string,update_id:string,
                               father_id?:string){
        let body;
        if (father_id !== undefined) {
            body = Body.form({
                wiki_id,id,title,content,update_id,father_id
            })
        }else{
            body = Body.form({
                wiki_id,id,title,content,update_id
            })
        }
        console.log("body",body)
        await http<ReqResult<SingleEditResult>>("/wiki/set",{
            method:'POST',
            body
        }).then((req_info)=>{
            if(req_info.data.success){
                return true
            }
        }).catch((err)=>{
            console.log(err)
            return false
        })
    }

    // 查询当前空间下的所有文章
    // TODO 最初查询时仅查询title、id、father_id用于文章展示，到点击时才请求内容信息
    async function get_current_articles(){
        show_articles.splice(0,current_articles.length)
        let id = current_space.value!.id
        await http<ReqResult<AllArticleResult>>("/wiki/all",{
            method:'GET',
            params:{
                wiki_id:id
            }
        }).then((req_info)=>{
            let data = req_info.data
            if(data.success){
                let items_info = (data.data as ArticleCollector).collector
                for (let i = 0; i < items_info.length; i++){
                    current_articles.push(items_info[i])
                    show_articles.push(items_info[i])
                }
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    async function add_partners(partners:Array<string>,logo:string){
        const body = Body.form({
            partners:qs.stringify(partners),
            logo
        })
        await http<ReqResult<SingleEditResult>>('/wiki/add_workmate',{
            method:'POST',
            body
        }).then((req_info)=>{
            if(req_info.data.success){
                return true
            }
        }).catch((err)=>{
            console.log(err)
            return false
        })
    }
    async function update_current_articles(){
        current_articles.splice(0,current_articles.length)
        show_articles.splice(0,show_articles.length)
        let id = current_space.value!.id
        await http<ReqResult<AllArticleResult>>("/wiki/all",{
            method:'GET',
            params:{
                wiki_id:id
            }
        }).then((req_info)=>{
            let data = req_info.data
            if(data.success){
                let items_info = (data.data as ArticleCollector).collector
                for (let i = 0; i < items_info.length; i++){
                    current_articles.push(items_info[i])
                    show_articles.push(items_info[i])
                }
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    function get_space_by_logo(logo:string){
        console.log("根据logo找项目")
        current_space.value =  spaces.find(pro => pro.logo === logo)
        console.log("找到的",current_space.value)
        return current_space.value
    }
    return {get_all,create,handle_star,get_spaces_length,get_current_articles,
        get_space_by_logo,set_article,create_article,update_current_articles,update,
        add_partners,
        spaces,star_spaces,show_spaces,current_space,show_articles}
},{persist:true})