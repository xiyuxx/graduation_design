<script setup lang="ts">
import {inject, onMounted, ref} from "vue";
import {useUserStore} from "../stores/user.ts";
import {useProjectStore} from "../stores/project.ts";
import {Search} from "@element-plus/icons-vue";
import {WINDOW_TYPES} from "../types/multiWindow.ts";

const currentTitle = defineModel()
const props = defineProps<{
  newButton:string,
  work_type:WINDOW_TYPES
}>()
const title = inject('title')

const useUser = useUserStore()
const useProject = useProjectStore()

const types = ref("")
onMounted(()=>{
  if(props.work_type === WINDOW_TYPES.PROJECT){
    types.value = "项目"
  }else if(props.work_type === WINDOW_TYPES.TEST){
    types.value = "测试库"
  }else if(props.work_type === WINDOW_TYPES.WIKI){
    types.value = "空间"
  }else if(props.work_type === WINDOW_TYPES.TOPIC){
    types.value = "话题"
  }else {
    types.value = "TODO"
  }
})

const handle_new = (work_type:WINDOW_TYPES)=>{
  if(work_type === WINDOW_TYPES.PROJECT){

  }else if(work_type === WINDOW_TYPES.TEST){

  }else if(work_type === WINDOW_TYPES.WIKI){

  }else if(work_type === WINDOW_TYPES.TOPIC){

  }else {

  }
}
</script>

<template>
  <el-container class="pt-4 w-full h-full ">
    <el-aside class="border-r-2 border-r-gray-200 h-full w-60">
      <slot name="subMenu"></slot>
    </el-aside>
    <el-main class="w-auto">
      <el-header class="flex-col  w-full">
        <div class="flex justify-between">
          <el-text class="text-2xl text-black ">{{currentTitle}}</el-text>
          <el-button size="large" @click="handle_new(work_type)">{{newButton}}</el-button>
        </div>
        <div class="flex justify-between mt-4">
          <el-input class="w-80" :prefix-icon="Search" placeholder="搜索"></el-input>
          <el-text class="text-lg text-gray-600" >{{useProject.projects.length}} 个{{types}}</el-text>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>