<script setup lang="ts">
import {inject} from "vue";
import {useUserStore} from "../stores/user.ts";
import {useProjectStore} from "../stores/project.ts";
const currentTitle = defineModel()
const props = defineProps<{
  newButton:string
}>()
const title = inject('title')

const useUser = useUserStore()
const useProject = useProjectStore()

import {Search} from "@element-plus/icons-vue";
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
          <el-button size="large" type="success">{{props.newButton}}</el-button>
        </div>
        <div class="flex justify-between mt-4">
          <el-input class="w-80" :prefix-icon="Search" placeholder="搜索"></el-input>
          <el-text class="text-lg text-gray-600" >{{useProject.projects.length}} 个项目</el-text>
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