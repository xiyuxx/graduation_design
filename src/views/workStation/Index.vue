<script setup lang="ts">
import {HomeFilled} from "@element-plus/icons-vue";

import {ref} from "vue";
import OuterPage from "../../slots/TopBar.vue";
const activeIndex = ref('1')
</script>
<template>
  <outer-page>
    <template #header>
      <el-icon :size="28" color="orange"> <HomeFilled></HomeFilled>
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
        <el-menu-item index="2" >
          <router-link to="/workStation/dashboards">
            仪表盘
          </router-link>
        </el-menu-item>
        <el-menu-item index="3" >
          <router-link to="/workStation/insight">
            工时
          </router-link>
        </el-menu-item>
      </el-menu>
      <div class="grow"/>
    </template>
  </outer-page>

</template>

<style scoped>

</style>