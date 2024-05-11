<script setup lang="ts">
import {onMounted, provide, ref} from "vue";
import {Management, Search, StarFilled} from "@element-plus/icons-vue";
import {Menu} from "../../types/subMenu";
import {WINDOW_TYPES} from "../../types/multiWindow.ts";
import {useTopicStore} from "../../stores/topic.ts";
import {useUserStore} from "../../stores/user.ts";
import {creator_window} from "../../utils/window.ts";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const talk_menu:Menu = {
  defaultPath: '/team/discuss/posts',
  menus:[
    {
      title:'讨论',
      items:[
        {
          itemIcon:'Clock',
          itemName:'最新讨论',
          itemColor:'#3158a6',
          itemPath:''
        },
        {
          itemIcon:'Microphone',
          itemName:'我发起的',
          itemColor:'#d7ad24',
          itemPath:''
        },
        {
          itemIcon:'ChatDotSquare',
          itemName:'我回复的',
          itemColor:'#3be02c',
          itemPath:''
        }
      ]
    }
  ]
}
const topic_menu:Menu = {
  defaultPath:'/team/discuss/topics',
  menus:[
    {
      title:'话题',
      items:[
        {
          itemIcon:'Menu',
          itemName:'全部话题',
          itemPath:'',
          itemColor:'#3158a6'
        },
        {
          itemIcon:'DataLine',
          itemName:'组织话题',
          itemPath:'',
          itemColor:'#2f8f23'
        },
        {
          itemIcon:'User',
          itemName:'团队话题',
          itemPath:'/team',
          itemColor:'#394c86'
        },
      ]
    }
  ]
}

const currentTitle = ref("全部话题")
const newButton = ref("新建话题")
provide('title',currentTitle)



const router = useRouter()
const changeTalk = (title)=>{
  if(router.currentRoute.value.fullPath === "/team/topics"){
    router.push("/team/discusses")
  }
  newButton.value = "新建讨论"
  currentTitle.value = title
  // TODO 需要修改！！
  count.value = useTopic.topics.length
  types.value = '讨论'
}
const changeTopic = (title)=>{
  if(router.currentRoute.value.fullPath === "/team/discusses"){
    router.push("/team/topics")
  }
  newButton.value = "新建话题"
  currentTitle.value = title
  count.value = useTopic.topics.length
  types.value = '话题'
}
const activeIndex = ref('topic0-0')

const useTopic = useTopicStore()
const useUser = useUserStore()

const count = ref(0)
const types = ref('讨论')

const handle_star = async (star:string, topic_id:string) => {
  await useTopic.handle_star(star,topic_id,useUser.user_id)
}
const handle_new = ()=>{
  if(newButton.value === '新建话题'){
    creator_window(WINDOW_TYPES.TOPIC)
  }else if(newButton.value === '新建讨论'){
    creator_window(WINDOW_TYPES.DISCUSS)
  }else{
    ElMessage("出错啦")
  }
}
</script>

<template>
  <el-container class="h-screen w-full">
    <el-header class="px-4 inline-flex items-center w-full shadow-md">
      <el-icon :size="20" color="green"> <Management/>
      </el-icon>
      <el-text class="px-4 ">讨论空间</el-text>
    </el-header>
    <el-main>
      <el-container class="pt-4 w-full h-full ">
        <el-aside class="border-r-2 border-r-gray-200 h-full w-60">
          <el-menu
              class="w-full"
              :default-active="activeIndex"
          >
            <template v-for="(part,i) in talk_menu.menus" class="font-medium" >
              <el-menu-item-group :title="part.title" >
                <el-menu-item
                    v-for="(item,j) in part.items"
                    :index="'discuss' + i + '-' + j"
                    @click="changeTalk(item.itemName)"
                    class="mr-4 rounded-md h-10 mb-4">
                  <el-icon>
                    <component :is="item.itemIcon" :color="item.itemColor"/>
                  </el-icon>
                  <el-text>{{item.itemName}}</el-text>
                </el-menu-item>
              </el-menu-item-group>
            </template >
            <el-menu-item-group title="星标" v-if="useTopic.star_topics.length > 0">
              <el-menu-item v-for="pro in useTopic.star_topics" class="mr-4 rounded-md h-10 mb-4 flex justify-between">
                <el-text>{{pro.name}}</el-text>
                <el-icon @click="handle_star('false',pro.id)">
                  <StarFilled class="text-yellow-500"/>
                </el-icon>
              </el-menu-item>
            </el-menu-item-group>
            <template v-for="(part,i) in topic_menu.menus" class="font-medium" >
              <el-menu-item-group :title="part.title" >
                <el-menu-item
                    v-for="(item,j) in part.items"
                    :index= "'topic' + i + '-' + j"
                    @click="changeTopic(item.itemName)"
                    class="mr-4 rounded-md h-10 mb-4">
                  <el-icon>
                    <component :is="item.itemIcon" :color="item.itemColor"/>
                  </el-icon>
                  <el-text>{{item.itemName}}</el-text>
                </el-menu-item>
              </el-menu-item-group>
            </template>
          </el-menu>
        </el-aside>
        <el-main class="w-auto">
          <el-header class="flex-col  w-full">
            <div class="flex justify-between">
              <el-text class="text-2xl text-black ">{{currentTitle}}</el-text>
              <el-button v-show="useUser.role === 0" size="large" @click="handle_new">{{newButton}}</el-button>
            </div>
            <div class="flex justify-between mt-4">
              <el-input class="w-80" :prefix-icon="Search" placeholder="搜索"></el-input>
              <el-text class="text-lg text-gray-600" >{{count}} 个{{types}}</el-text>
            </div>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>