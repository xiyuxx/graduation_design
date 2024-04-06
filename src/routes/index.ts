import {createRouter,createWebHistory} from "vue-router";
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

const routes = [
    {
        path:'/',
        redirect:'/workStation',
    },
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
                path: 'projects',
                component: ()=>import("../views/pjManagement/Projects.vue")
            },
            {
                path: 'organization',
                component: ()=>import("../views/pjManagement/Organization.vue")
            },
            {
                path: 'portfolios',
                component: ()=>import("../views/pjManagement/Portfolios.vue")
            },
            {
                path: 'queries',
                component: ()=>import("../views/pjManagement/Queries.vue")
            },
            {
                path: 'team',
                component: ()=>import("../views/pjManagement/Team.vue")
            }
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

        ]
    },
    {
        path: '/wiki',
        component: ()=>import("../views/wiki/Index.vue")
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router