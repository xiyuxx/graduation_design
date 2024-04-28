<script setup lang="ts">
import {ref} from "vue";
import {Finished} from "@element-plus/icons-vue";
import HomePage from "../../slots/TopBar.vue";
import InnerPage from "../../slots/SideBar.vue";
import SubMenu from "../../components/SubMenu.vue";
import {Menu} from "../../types/subMenu";


const menu:Menu = {
  defaultPath:'/testHub',
  menus:[
    {
      title:'测试库',
      items:[
        {
          itemIcon:'Menu',
          itemName:'全部测试库',
          itemPath:'/libraries',
        },
        {
          itemIcon:'DataLine',
          itemName:'组织测试库',
          itemPath:'/organization'
        },
        {
          itemIcon:'User',
          itemName:'团队项目',
          itemPath:'/team'
        }
      ]
    },
    {
      title:'待办',
      items:[
        {
          itemIcon: 'ArrowUp',
          itemName: '我负责的',
          itemPath: '/obliged'
        },
        {
          itemIcon: 'Download',
          itemName: '我参与的',
          itemPath: '/participated'
        },
        {
          itemIcon: 'MoreFilled',
          itemName: '进行中的',
          itemPath: '/continue'
        }
      ]
    }
  ]
}
const activeIndex = ref('0-0')
</script>

<template>
  <home-page>
    <template #header>
      <el-icon :size="20" color="green"> <Finished/>
      </el-icon>
      <el-text class="px-4 ">测试管理</el-text>
    </template>
    <template #content>
      <inner-page>
        <template #subMenu>
          <el-menu class="w-full" :default-active="activeIndex">
            <sub-menu :menu="menu"/>
          </el-menu>
        </template>
      </inner-page>
    </template>
  </home-page>
</template>

<style scoped>
:deep(.is-active){
  background-color: #d4e5fa !important;
  color: #7ac3f1 !important;
}
</style>