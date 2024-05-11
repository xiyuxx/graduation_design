import {defineStore} from "pinia";
import {reactive,ref} from "vue";
import {Project} from "../types/project";

import {AllProjectResult, ProjectCollector, ReqResult} from "../types/result";
import http from "../utils/axios.ts";
import {formatDateTime} from "../utils/time.ts";


export const useTestHubStore = defineStore('testHub',()=>{
    const hubs = reactive<Project[]>([])
    const star_hubs = reactive<Project[]>([])
    const show_hubs = reactive<Project[]>([])

    const if_req = ref(false)
    async function get_all(user_id:string){
        if(!if_req.value){
            if_req.value = true
            await http<ReqResult<AllProjectResult>>("/test/get_hub",{
                method:'GET',
                params:{
                    id:user_id
                }
            }).then((req_info)=> {
                let data = req_info.data
                console.log("请求所有项目数据")
                if(data.success){
                    let project_info = (data.data as ProjectCollector).collector

                    for (let i = 0; i < project_info.length; i++) {
                        project_info[i].last_update = formatDateTime(project_info[i].last_update)
                        hubs.push(project_info[i])
                        show_hubs.push(project_info[i])
                        if(project_info[i].if_star){
                            star_hubs.push(project_info[i])
                        }
                    }
                    console.log(hubs)
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    }
    return {
        hubs,star_hubs,show_hubs,
        get_all
    }
},{persist:true})