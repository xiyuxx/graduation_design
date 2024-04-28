<script setup lang="ts">

import {Menu} from "../types/subMenu";
import {ref} from "vue"
import {StarFilled} from "@element-plus/icons-vue";
import {useProjectStore} from "../stores/project.ts";
import {useUserStore} from "../stores/user.ts";
const {menu}= defineProps<{
  menu:Menu,
}>()
console.log(menu.defaultPath)

const currentTitle = defineModel('title')
const stars = defineModel('stars',{required:false})
const changeTitle = (title)=>{
  currentTitle.value = title
}
const useProject = useProjectStore()
const useUser = useUserStore()
const star_color = ref("#649b9b")
</script>
<template>
  <template v-for="(part,i) in menu.menus" class="font-medium" >
        <el-menu-item-group :title="part.title" >
          <el-menu-item
              v-for="(item,j) in part.items"
              :index="i + '-' + j"
              class="mr-4  rounded-md h-10 mb-4">
            <router-link :to="menu.defaultPath+ item.itemPath" @click="changeTitle(item.itemName)">
            <el-icon>
              <component :is="item.itemIcon" :color="item.itemColor"/>
            </el-icon>
            <el-text>{{item.itemName}}</el-text>
            </router-link>
          </el-menu-item>
        </el-menu-item-group>
  </template>
  <div v-if="stars" >
    <el-menu-item-group title="星标">
      <el-menu-item v-for="pro in stars" class="mr-4 rounded-md h-10 mb-4 flex justify-between">
        <el-text>{{pro.name}}</el-text>
        <el-icon :color="star_color" @click="useProject.handle_star('false',pro.id,useUser.user_id)">
          <StarFilled/>
        </el-icon>
      </el-menu-item>
    </el-menu-item-group>
  </div>
</template>
<style scoped>

</style>