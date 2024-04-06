<script setup lang="ts">

import OuterPage from "../OuterPage.vue";
import {Files} from "@element-plus/icons-vue";
import InnerPage from "../InnerPage.vue";
import SubMenu from "../../components/SubMenu.vue";
import {Menu} from "../../types/subMenu";


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
      <inner-page>
        <template #subMenu>
          <el-menu class="w-full">
            <sub-menu :menu="menu"/>
          </el-menu>
        </template>
      </inner-page>
    </template>
  </outer-page>
</template>

<style scoped>

</style>