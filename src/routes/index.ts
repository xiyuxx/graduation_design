import {createRouter,createWebHistory} from "vue-router";

import Login from "../views/Login.vue"

import WorkStation from '../views/workStation/Index.vue'
import WorkStationHome from "../views/workStation/home/Index.vue"
import HomeOverview from "../views/workStation/home/Overview.vue"
import HomeWorks from "../views/workStation/home/Works.vue"
import HomeReminders from "../views/workStation/home/Reminders.vue"
import HomeMine from "../views/workStation/home/Mine.vue"
import HomeCreated from "../views/workStation/home/Created.vue"
import HomeAssigned from "../views/workStation/home/Assigned.vue"
import HomeParticipated from "../views/workStation/home/Participated.vue"

import WorkInsight from "../views/workStation/insight/Index.vue"
import WorkDashboards from "../views/workStation/dashboards/Index.vue"
import WorkSpace from "../views/WorkSpace.vue";
import Register from "../views/Register.vue";


const routes = [
    {
        path:'/login',
        component: Login
    },
    {
        path:'/register',
        component: Register
    },
    {
        path:'/creator/:work_type',
        component: ()=>import("../components/Creator.vue")
    },
    {
        path:'/',
        component: WorkSpace,
        redirect:'/workStation',
        children: [
            {
                path: '/workStation',
                component: WorkStation,
                children:[
                    {
                        path:'',
                        redirect:'/workStation/home'
                    },
                    {
                        path: 'home',
                        component: WorkStationHome,
                        children:[
                            {
                                path:'',
                                redirect:'/workStation/home/overview',
                            },
                            {
                                path:'overview',
                                component: HomeOverview
                            },
                            {
                                path:'works',
                                component: HomeWorks
                            },
                            {
                                path:'reminders',
                                component: HomeReminders
                            },
                            {
                                path:'mine',
                                component: HomeMine
                            },
                            {
                                path:'created',
                                component: HomeCreated
                            },
                            {
                                path:'assigned',
                                component: HomeAssigned
                            },
                            {
                                path:'participated',
                                component: HomeParticipated
                            }
                        ]
                    },
                    {
                        path:'insight',
                        component: WorkInsight,
                    },
                    {
                        path: 'dashboards',
                        component: WorkDashboards
                    }
                ]
            },
            {
                path:'/pjm',
                component: ()=>import("../views/pjManagement/Index.vue"),
                children: [
                    {
                        path: '',
                        redirect: '/pjm/projects'
                    },
                    {
                        path: 'projects',//查看所有项目
                        component: ()=>import("../views/pjManagement/Projects.vue"),
                    },

                ]
            },
            {
                path:'/testHub',
                component: ()=>import("../views/testHub/Index.vue"),
                children: [
                    {
                        path: '',
                        redirect: '/testHub/libraries',
                    },
                    {
                        path: 'libraries',
                        component: ()=>import("../views/testHub/Libraries.vue")
                    },
                    {
                        path: 'continue',
                        component: ()=>import("../views/testHub/Continue.vue")
                    },
                    {
                        path: 'obliged',
                        component: ()=>import("../views/testHub/Obliged.vue")
                    },
                    {
                        path: 'organization',
                        component: ()=>import("../views/testHub/Organization.vue")
                    },
                    {
                        path: 'team',
                        component: ()=>import("../views/testHub/Team.vue")
                    },
                    {
                        path: 'participated',
                        component: ()=>import("../views/testHub/Participated.vue")
                    },
                ]
            },
            {
                path: '/team',
                component: ()=>import("../views/team/Index.vue"),
                children: [
                    {
                        path:'',
                        redirect: '/team/topics'
                    },
                    {
                        path:'topics',
                        component:()=>import("../views/team/Topics.vue")
                    },
                    {
                        path:'discusses',
                        component:()=>import("../views/team/Discusses.vue")
                    }
                ]
            },
            {
                path:'/wiki',
                component: ()=>import("../views/wiki/Index.vue"),
                children: [
                    {
                        path:'',
                        redirect: '/wiki/spaces'
                    },
                    {
                        path:'spaces',
                        component:()=>import("../views/wiki/Spaces.vue")
                    }
                ]
            }
        ]
    },
    {
        path:'/project/:logo',
        component: ()=>import("../views/pjManagement/ProjectDetail.vue")
    },
    {
        path:'/wiki/:logo',
        component: ()=>import("../views/wiki/WikiDetail.vue")
    },
    {
        path:'/topic/:logo',
        component: ()=>import("../views/team/TopicDetail.vue")
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router