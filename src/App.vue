<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import {ref} from "vue";
import {
  HomeFilled,
  Files,
    Finished,
    Management
} from "@element-plus/icons-vue";

const isCollapse = ref(true)
</script>

<template>
  <div class="container">
    <el-container class="w-screen flex">
      <el-aside class="h-screen w-auto ">
        <el-menu
            default-active="1"
            :collapse="isCollapse"
            class="!border-r-2 !border-r-gray-500 h-full"
          >
          <router-link to="/workStation">
            <el-menu-item index="1">
                <el-icon class="mr-9"><HomeFilled /></el-icon>
                <template #title>工作台</template>
            </el-menu-item>
          </router-link>
          <el-menu-item index="2">
            <el-icon><Files/> </el-icon>
            <template #title>项目管理</template>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Finished/> </el-icon>
            <template #title>测试管理</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><Management/> </el-icon>
            <template #title>知识管理</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="px-0 py-0 grow ">
        <RouterView class="min-w-full"></RouterView>
        <el-button @click="isCollapse = !isCollapse">zhankai</el-button>
      </el-main>
    </el-container>
  </div>

</template>

<style scoped>

</style>
