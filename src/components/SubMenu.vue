<script setup lang="ts">

import {Menu} from "../types/subMenu";
import {ref} from "vue"
import {StarFilled} from "@element-plus/icons-vue";
import {useProjectStore} from "../stores/project.ts";
import {useUserStore} from "../stores/user.ts";
import {WINDOW_TYPES} from "../types/multiWindow.ts";

const {menu,types}= defineProps<{
  menu:Menu,
  types:WINDOW_TYPES
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
const handle_star = (pro_id:string)=>{
  if(types === WINDOW_TYPES.PROJECT){
    useProject.handle_star('false',pro_id,useUser.user_id)
  }else if(types === WINDOW_TYPES.TEST){
    //TODO
  }else if(types === WINDOW_TYPES.WIKI){
    //TODO
  }else if(types === WINDOW_TYPES.TOPIC){
    //TODO
  }else{
    //TODO
  }
}
</script>
<template>
  <template v-for="(part,i) in menu.menus" class="font-medium" >
        <el-menu-item-group :title="part.title" >
          <el-menu-item
              v-for="(item,j) in part.items"
              :index="i + '-' + j"
              @click="changeTitle(item.itemName)"
              class="mr-4  rounded-md h-10 mb-4">
            <el-icon>
              <component :is="item.itemIcon" :color="item.itemColor"/>
            </el-icon>
            <el-text>{{item.itemName}}</el-text>
          </el-menu-item>
        </el-menu-item-group>
  </template>
  <div v-if="stars && stars.length" >
    <el-menu-item-group title="星标">
      <el-menu-item v-for="pro in stars" class="mr-4 rounded-md h-10 mb-4 flex justify-between">
        <el-text>{{pro.name}}</el-text>
        <el-icon :color="star_color" @click="handle_star(pro.id)">
          <StarFilled/>
        </el-icon>
      </el-menu-item>
    </el-menu-item-group>
  </div>
</template>
<style scoped>

</style>