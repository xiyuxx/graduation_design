<script setup lang="ts">

import OuterPage from "../../slots/TopBar.vue";
import {Files} from "@element-plus/icons-vue";
import InnerSideBar from "../../slots/SideBar.vue";
import SubMenu from "../../components/SubMenu.vue";
import {Menu} from "../../types/subMenu";
import {ref} from "vue";


const menu:Menu = {
  defaultPath :'/pjm',
  menus:[
    {

      title:'项目',
      items:[
        {
          itemIcon:'Menu',
          itemName:'全部项目',
          itemPath:'/projects'
        },
        {
          itemIcon:'DataLine',
          itemName:'组织项目',
          itemPath:'/organization'
        },
        {
          itemIcon:'User',
          itemName:'团队项目',
          itemPath:'/team'
        },
      ]
    },
    {
      title:'工作',
      items:[
        {
          itemIcon: 'Folder',
          itemName: '项目集',
          itemPath: '/portfolios'
        },
        {
          itemIcon: 'FolderRemove',
          itemName: '筛选器',
          itemPath: '/queries'
        }
      ]
    }
  ]
}

const activeIndex = ref('0-0')
</script>

<template>
  <outer-page>
    <template #header>
      <el-icon :size="20" color="blue">
        <Files ></Files>
      </el-icon>
      <el-text class="px-4 ">项目管理</el-text>
    </template>
    <template #content>
      <inner-side-bar>
        <template #subMenu>
          <el-menu
              class="w-full"
              :default-active="activeIndex"
          >
            <sub-menu :menu="menu"/>
          </el-menu>
        </template>
      </inner-side-bar>
    </template>
  </outer-page>
</template>

<style scoped>

</style>