import {createRouter,createWebHistory} from "vue-router";
import WorkStation from '../views/workStation/Index.vue'
import WorkStationHome from "../views/workStation/home/Index.vue"
import HomeOverview from "../views/workStation/home/Overview.vue"
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
                    }
                ]
            }
        ]
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router