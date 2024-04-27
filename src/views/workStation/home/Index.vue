<script setup lang="ts">
import {House} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import {getDateTimeInfo} from "../../../utils/time.ts"
import {Menu} from "../../../types/subMenu";
import SubMenu from "../../../components/SubMenu.vue";
import InnerPage from "../../../slots/SideBar.vue";
import {useUserStore} from "../../../stores/user.ts";



const { period, dayOfWeek, month, day } = getDateTimeInfo();
const activeIndex = ref('0')
const menu:Menu = {
  defaultPath:"/workStation/home",
  menus: [
    {
      title:"待办",
      items:[
        {
          itemIcon:"DocumentChecked",
          itemName:"待完成事项",
          itemPath: '/works',
        },
        {
          itemIcon:"More",
          itemName:"待处理提醒",
          itemPath: '/reminders',
        },
      ]
    },
    {
      title:"我的",
      items:[
        {
          itemIcon: "ArrowUp",
          itemName: "我负责的事项",
          itemPath: '/mine'
        },
        {
          itemIcon: "Plus",
          itemName: "我创建的事项",
          itemPath: '/created'
        },
        {
          itemIcon: "Right",
          itemName: "我关注的事项",
          itemPath: '/assigned'
        },
        {
          itemIcon: "Aim",
          itemName: "我关注的事项",
          itemPath: '/participated'
        },
      ]
    }
  ]
}

const useUser = useUserStore()
const user_name = ref("")
const avatar = ref("")
onMounted(async ()=>{
  user_name.value = useUser.user_name
  avatar.value = useUser.avatar
  console.log(avatar.value)
  console.log(user_name.value)
})
</script>
<template>
<inner-page>
  <template #subMenu>
    <!--      个人信息-->
    <div class="inline-flex items-center space-x-4 ">
      <el-avatar :size="50" :src="useUser.avatar"></el-avatar>
      <div>
        <el-text>{{useUser.user_name}},{{period}}好</el-text>
        <br>
        <el-text>今天是{{month}}月{{day}}，{{dayOfWeek}}</el-text>
      </div>
    </div>
    <el-divider/>
    <!--      菜单栏-->
    <div>
      <el-menu class="w-full"
               :default-active="activeIndex"
      >
        <router-link to="/workStation/home/overview">
          <el-menu-item
              index="0"
              class="mr-4 -my-4 rounded-md h-10">
            <el-icon><House /></el-icon>
            <el-text>概览</el-text>
          </el-menu-item>
        </router-link>
        <el-divider/>
        <sub-menu :menu="menu" />
      </el-menu>
    </div>
  </template>
</inner-page>
</template>

<style scoped>
:deep(.is-active){
  background-color: #d4e5fa !important;
  color: #7ac3f1 !important;
}

</style>