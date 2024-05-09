import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {Project} from "../types/project";
import http from "../utils/axios.ts";
import {AllProjectResult, ProjectCollector, ReqResult, SingleEditResult} from "../types/result";
import {formatDateTime} from "../utils/time.ts";
import {Body} from "@tauri-apps/api/http";


export const useTopicStore = defineStore('topic',()=>{
    const topics = reactive<Project[]>([])
    const star_topics = reactive<Project[]>([])
    const show_topics = reactive<Project[]>([])

    const id = ref("")
    const current_topic = ref<Project>()

    const if_req = ref(false)
    async function get_all(user_id:string){
        if(!if_req.value){
            id.value = user_id
            if_req.value = true
            await http<ReqResult<AllProjectResult>>('/topic/get_topic',{
                method:'GET',
                params:{
                    id:user_id
                }
            }).then((req_info)=>{
                let data = req_info.data
                console.log("请求所有话题数据")
                if(data.success){
                    let project_info = (data.data as ProjectCollector).collector

                    for (let i = 0; i < project_info.length; i++) {
                        project_info[i].last_update = formatDateTime(project_info[i].last_update)
                        topics.push(project_info[i])
                        show_topics.push(project_info[i])
                        if(project_info[i].if_star){
                            star_topics.push(project_info[i])
                        }
                    }
                    console.log(topics)
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    }

    async function handle_star(star:string,pro_id:string,user_id:string) {
        const body = Body.form({
            star,
            id:pro_id,
            userId:user_id
        })
        console.log(body)
        await http<ReqResult<SingleEditResult>>('/topic/set_star',{
            method:'POST',
            body
        }).then((req_info)=>{
            if(req_info.data.success){
                update_topic_star(pro_id)
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    function get_topics_length(){
        return topics.length
    }
    function update_topic_star(pro_id:string) {
        console.log("更新wiki星标")
        let pro = topics.find(pro => pro.id === pro_id)
        if (pro) {
            pro.if_star = !pro.if_star
            if (pro.if_star) {
                star_topics.push(pro)
            } else {
                let index = star_topics.findIndex(pro => pro.id === pro_id)
                if (index !== -1) {
                    star_topics.splice(index, 1)
                }
            }
        }
    }
    async function update(){
        await http<ReqResult<AllProjectResult>>('/topic/get_topic',{
            method:'GET',
            params:{
                id,
            }
        }).then((req_info)=>{
            let data = req_info.data
            console.log("请求所有话题数据")
            if(data.success){
                let project_info = (data.data as ProjectCollector).collector
                topics.splice(0,topics.length)
                show_topics.splice(0,show_topics.length)
                star_topics.splice(0,star_topics.length)
                for (let i = 0; i < project_info.length; i++) {
                    project_info[i].last_update = formatDateTime(project_info[i].last_update)
                    topics.push(project_info[i])
                    show_topics.push(project_info[i])
                    if(project_info[i].if_star){
                        star_topics.push(project_info[i])
                    }
                }
                console.log(topics)
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    async function create(name:string,logo:string,organization:string,userId:string,if_private = false){
        const body = Body.form({
            name,logo,organization,userId,private:if_private.toString()
        })
        await http<ReqResult<SingleEditResult>>('/topic/set_topic',{
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
    return {get_all,create,handle_star,get_spaces_length: get_topics_length,update,
        topics,star_topics,show_topics,current_topic}
})