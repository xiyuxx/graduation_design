<script setup lang="ts">
import {HomeFilled} from "@element-plus/icons-vue";

import {ref} from "vue";
import Home from "./home/Index.vue";
import Greet from "../../components/Greet.vue";
const activeIndex = ref('1')
</script>
<template>
  <div class="container ">
    <el-container>
      <el-header class="px-4 inline-flex items-center w-full px-0 shadow-md">
        <el-icon :size="30" color="orange"> <HomeFilled></HomeFilled>
        </el-icon>
        <el-text class="px-4 border-r-2">工作台</el-text>
        <el-menu
            :default-active="activeIndex"
            class="inline-flex"
            mode="horizontal"
            :ellipsis="false"
        >
            <el-menu-item index="1" >
              <router-link to="/workStation/home">首页</router-link>
            </el-menu-item>

        <el-menu-item index="2" >仪表盘</el-menu-item>
        <el-menu-item index="3" >工时</el-menu-item>
      </el-menu>
        <div class="grow"/>
      </el-header>
      <el-container class="w-full px-4">
        <Home/>
      </el-container>
    </el-container>
    <Greet></Greet>
  </div>
</template>

<style scoped>

</style>