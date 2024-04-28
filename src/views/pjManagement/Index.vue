<script setup lang="ts">

import OuterPage from "../../slots/TopBar.vue";
import {Files} from "@element-plus/icons-vue";
import InnerSideBar from "../../slots/SideBar.vue";
import SubMenu from "../../components/SubMenu.vue";
import {Menu} from "../../types/subMenu";
import {provide, ref} from "vue";
import {useProjectStore} from "../../stores/project.ts";


const menu:Menu = {
  defaultPath :'/pjm',
  menus:[
    {
      title:'项目',
      items:[
        {
          itemIcon:'Menu',
          itemName:'全部项目',
          itemPath:'/projects',
          itemColor:'#3158a6'
        },
        {
          itemIcon:'DataLine',
          itemName:'组织项目',
          itemPath:'/organization',
          itemColor:'#2f8f23'
        },
        {
          itemIcon:'User',
          itemName:'团队项目',
          itemPath:'/team',
          itemColor:'#394c86'

        },
      ]
    },
    {
      title:'工作',
      items:[
        {
          itemIcon: 'Folder',
          itemName: '项目集',
          itemPath: '/portfolios',
          itemColor:'#c72929'
        },
        {
          itemIcon: 'FolderRemove',
          itemName: '筛选器',
          itemPath: '/queries',
          itemColor:'#d0913f'
        }
      ]
    }
  ]
}
const activeIndex = ref('0-0')

const currentTitle = ref("全部项目")
provide('title',currentTitle)

const newButton = ref("新建项目")
const useProject = useProjectStore()
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
      <!--              此处展示标题-->
      <inner-side-bar
          v-model="currentTitle"
          :newButton = "newButton"
      >
        <template #subMenu>
          <el-menu
              class="w-full"
              :default-active="activeIndex"
          >
<!--            点击修改标题-->
            <sub-menu
                :menu="menu"
                v-model:title="currentTitle"
                v-model:stars="useProject.star_projects"
            />
          </el-menu>
        </template>
      </inner-side-bar>
    </template>
  </outer-page>
</template>

<style scoped>
:deep(.is-active){
  background-color: #d4e5fa !important;
  color: #7ac3f1 !important;
}
</style>