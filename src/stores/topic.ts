import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {Project} from "../types/project";
import http from "../utils/axios.ts";
import {
    AllCommentResult, AllDiscussResult,
    AllProjectResult, AllReplyResult,
    CommentCollector, DiscussCollector,
    ProjectCollector, ReplyCollector,
    ReqResult,
    SingleEditResult
} from "../types/result";
import {formatDateTime} from "../utils/time.ts";
import {Body} from "@tauri-apps/api/http";
import {Discuss, IComment} from "../types/topic"
import qs from "qs";


export const useTopicStore = defineStore('topic',()=>{
    const topics = reactive<Project[]>([])
    const star_topics = reactive<Project[]>([])
    const show_topics = reactive<Project[]>([])


    const id = ref("")
    const current_topic = ref<Project>()

    const current_comment = reactive<IComment[]>([])
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

    async function add_partners(partners:Array<string>,logo:string){
        const body = Body.form({
            partners:qs.stringify(partners),
            logo
        })
        await http<ReqResult<SingleEditResult>>('/topic/add_workmate',{
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
    function update_topic_star(pro_id:string) {
        console.log("更新topic星标")
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
    function get_topics_length(){
        return topics.length
    }

    async function get_current_comments(){
        current_comment.splice(0,current_comment.length)

        let id = current_topic.value!.id
        await http<ReqResult<AllCommentResult>>("/topic/all",{
            method:'GET',
            params:{
                topic_id:id
            }
        }).then((req_info)=>{
            let data = req_info.data
            if(data.success){
                let comments = (data.data as CommentCollector).collector
                for(let i = 0; i < comments.length; i++){
                    current_comment.push(comments[i])
                }
            }
        }).catch(err=>{
            console.log("请求评论出错",err)
        })
    }
    async function get_replies(topic_id:string, comment_id:string){
        let comment = current_comment.find(com => com.id.toString() === comment_id)
        if(comment) {
            if( comment.replies.length > 0){
                comment.replies.splice(0, comment.replies.length)
            }
            await http<ReqResult<AllReplyResult>>("/topic/all", {
                method: 'GET',
                params: {
                    topic_id, comment_id
                }
            }).then((req_info) => {
                let data = req_info.data
                if (data.success) {
                    let replies = (data.data as ReplyCollector).collector
                    for (let i = 0; i < replies.length; i++) {
                        comment!.replies.push(replies[i])
                    }
                }
            }).catch(err => {
                console.log("请求回复出错了", err)
            })
        }
    }
    async function create(name:string,logo:string,organization:string,userId:string,if_private = false){
        const body = Body.form({
            name,logo,organization,userId,private:if_private.toString()
        })
        await http<ReqResult<SingleEditResult>>('/topic/set',{
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

    const current_discusses = reactive<Discuss[]>([])
    async function get_current_discusses(){
        if(current_discusses.length > 0){
            current_discusses.splice(0,current_discusses.length)
        }
        let id = current_topic.value!.id
        await http<ReqResult<AllDiscussResult>>("/topic/discuss",{
            method:'GET',
            params:{
                topic_id:id
            }
        }).then((req_info)=>{
            let data = req_info.data
            if(data.success){
                let discusses = (data.data as DiscussCollector).collector
                for(let i = 0; i < discusses.length; i++){
                    current_discusses.push(discusses[i])
                }
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    async function update_current_discusses(){
        current_discusses.splice(0,current_discusses.length)
        let id = current_topic.value!.id
        await http<ReqResult<AllDiscussResult>>("/topic/discuss",{
            method:'GET',
            params:{
                topic_id:id
            }
        }).then((req_info)=>{
            let data = req_info.data
            if(data.success){
                let discusses = (data.data as DiscussCollector).collector
                for(let i = 0; i < discusses.length; i++){
                    current_discusses.push(discusses[i])
                }
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    async function create_discuss(topic_id:string,title:string,content:string,from_uid:string){
        let body = Body.form({
            topic_id,title,content,from_uid
        })

        await http<ReqResult<SingleEditResult>>("/topic/discuss",{
            method:'POST',
            body
        }).then((req_info)=>{
            if(req_info.data.success){
                return true
            }
        }).catch(err=>{
            console.log(err)
            return false
        })
    }

    async function create_comment(topic_id:string,discuss_id:string,content:string,from_uid:string){
        let body = Body.form({
            topic_id,discuss_id,content,from_uid
        })
        await http<ReqResult<SingleEditResult>>("/topic/comment",{
            method:"POST",
            body
        }).then(req_info =>{
            if(req_info.data.success){
                return true
            }
        }).catch(err=>{
            console.log(err)
            return false
        })
    }

    return {get_all,create,handle_star,get_spaces_length: get_topics_length,update,
        get_current_comments,get_replies, add_partners,get_current_discusses,
        create_discuss,update_current_discusses,create_comment,
        topics,star_topics,show_topics,current_topic,current_discusses}
},{persist:true})