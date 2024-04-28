import {defineStore} from "pinia";
import {reactive,ref} from "vue";
import http from "../utils/axios.ts";
import {AllProjectResult, ProjectCollector, ReqResult, SingleEditResult} from "../types/result";
import {Project} from "../types/project";
import {formatDateTime} from "../utils/time.ts";
import {Body} from "@tauri-apps/api/http";


export const useProjectStore = defineStore('project',()=> {
    const projects = reactive<Project[]>([])
    const star_projects = reactive<Project[]>([])

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
    function get_project_by_logo(logo:string){
        return projects.find(pro => pro.logo === logo)
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
    return {get_all,get_project_by_logo,update_project_star,handle_star,get_projects_length,
        projects,star_projects
    }
})