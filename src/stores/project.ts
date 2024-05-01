import {defineStore} from "pinia";
import {reactive,ref} from "vue";
import http from "../utils/axios.ts";
import {
    AllProjectResult,
    AllWorkItemResult,
    ProjectCollector,
    ReqResult,
    SingleEditResult,
    WorkItemCollector
} from "../types/result";
import {Project, WorkItem} from "../types/project";
import {formatDateTime} from "../utils/time.ts";
import {Body} from "@tauri-apps/api/http";


export const useProjectStore = defineStore('project',()=> {
    const projects = reactive<Project[]>([])
    const star_projects = reactive<Project[]>([])
    const show_projects = reactive<Project[]>([])

    const show_work_items = reactive<WorkItem[]>([])
    const current_work_items = reactive<WorkItem[]>([])
    const current_project = ref<Project>()
    const if_req = ref(false)
    async function get_all(user_id:string) {
        if (!if_req.value){
            if_req.value = true
            await http<ReqResult<AllProjectResult>>('/project/get_project',{
                method:'GET',
                params:{
                    user_id,
                }
            }).then((req_info)=> {
                let data = req_info.data
                console.log("请求所有项目数据")
                if(data.success){
                    let project_info = (data.data as ProjectCollector).collector

                    for (let i = 0; i < project_info.length; i++) {
                        project_info[i].last_update = formatDateTime(project_info[i].last_update)
                        projects.push(project_info[i])
                        show_projects.push(project_info[i])
                        if(project_info[i].if_star){
                            star_projects.push(project_info[i])
                        }
                    }
                    console.log(projects)
                }
            }).catch(err=>{

                console.log(err)
            })
        }
    }

    async function get_current_work_items(){
        if(current_project){
            // 清除原有工作项
            if(current_work_items.length > 0){
                current_work_items.splice(0,current_work_items.length)
            }
            let id = current_project.value!.id
            await http<ReqResult<AllWorkItemResult>>('/item/get_items',{
                method:'GET',
                params:{
                    project_id:id
                }
            }).then((req_info)=>{
                let data = req_info.data
                console.log("请求所有当前项目所有工作项")
                if(data.success){
                    let items_info = (data.data as WorkItemCollector).collector
                    for (let i = 0; i < items_info.length; i++){
                        current_work_items.push(items_info[i])
                        show_work_items.push(items_info[i])
                    }
                }
            }).catch(err=>{
                console.log("请求工作项出错了",err)
            })
        }
    }
    function get_project_by_logo(logo:string){
        console.log("根据logo找项目")
        current_project.value =  projects.find(pro => pro.logo === logo)
        console.log("找到的",current_project.value)
        return current_project.value
    }


    async function handle_star(star:string,pro_id:string,user_id:string) {
        const body = Body.form({
            star,
            id:pro_id,
            userId:user_id
        })
        await http<ReqResult<SingleEditResult>>('/project/set_star',{
            method:'POST',
            body
        }).then((req_info)=>{
            if(req_info.data.success){
                update_project_star(pro_id)
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    function get_projects_length(){
        return projects.length
    }

    function update_project_star(pro_id:string){
        let pro = projects.find(pro=> pro.id === pro_id)
        if(pro){
            pro.if_star = !pro.if_star
            if(pro.if_star){
                star_projects.push(pro)
            }else{
                let index = star_projects.findIndex(pro=>pro.id === pro_id)
                if(index !== -1){
                    star_projects.splice(index,1)
                }
            }
        }
    }

    function find_project_by_logo(logo:string){
        current_project.value = projects.find(pro => pro.logo === logo)
        return !!current_project;

    }
    return {get_all,get_project_by_logo,update_project_star,handle_star,
        get_projects_length,find_project_by_logo,get_current_work_items,
        projects,star_projects,current_project,current_work_items,show_work_items
    }
},{persist:true})