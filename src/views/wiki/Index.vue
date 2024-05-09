<script setup lang="ts">
import OuterPage from "../../slots/TopBar.vue";
import { Management} from "@element-plus/icons-vue";
import InnerSideBar from "../../slots/SideBar.vue";
import SubMenu from "../../components/SubMenu.vue";
  import {Menu} from "../../types/subMenu";
  import {provide, ref} from "vue"
  import {useWikiStore} from "../../stores/wiki.ts";
import {WINDOW_TYPES} from "../../types/multiWindow.ts";
  const menu:Menu = {
    defaultPath:'/wiki',
    menus:[
      {
        title:'空间',
        items:[
          {
            itemIcon:'Menu',
            itemName:'全部空间',
            itemPath:'/spaces',
            itemColor:'#3158a6'
          },
          {
            itemIcon:'DataLine',
            itemName:'组织空间',
            itemPath:'/organization',
            itemColor:'#2f8f23'
          },
          {
            itemIcon:'User',
            itemName:'个人空间',
            itemPath:'/personal',
            itemColor:'#394c86'
          },
        ]
      }
    ]
  }

  const activeIndex = ref('0-0')
  const currentTitle = ref("全部空间")
  provide('title',currentTitle)

  const newButton = ref("新建空间")
  const useWiki = useWikiStore()
</script>

<template>
  <outer-page>
    <template #header>
      <el-icon :size="20" color="blue">
        <Management/>
      </el-icon>
      <el-text class="px-4">空间管理</el-text>
    </template>
    <template #content>
      <inner-side-bar
        v-model="currentTitle"
        :newButton = "newButton"
        :work_type = "WINDOW_TYPES.WIKI"
      >
        <template #subMenu>
          <el-menu
            class="w-full"
            :default-active="activeIndex"
          >
            <sub-menu
              :menu="menu"
              :types="WINDOW_TYPES.WIKI"
              v-model:title="currentTitle"
              v-model:stars="useWiki.star_spaces"
            ></sub-menu>

          </el-menu>
        </template>
      </inner-side-bar>
    </template>
  </outer-page>
</template>

<style scoped>

</style>