<script setup lang="ts">
import {ref} from "vue";
import {
  HomeFilled,
  Files,
  Finished,
  Management, ChatDotRound
} from "@element-plus/icons-vue";
import {useUserStore} from "../stores/user.ts";
import {useRouter} from "vue-router";
import {back_login} from "../utils/window.ts";

const isCollapse = ref(true)

const useUser = useUserStore()
const router = useRouter()
const handleLogout = function (){
  useUser.$reset()
  back_login()
  router.push("/login")
}
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
          <router-link to="/pjm">
            <el-menu-item index="2">
              <el-icon><Files/> </el-icon>
              <template #title>项目管理</template>
            </el-menu-item>
          </router-link>
          <router-link to="/testHub">
            <el-menu-item index="3">
              <el-icon><Finished/> </el-icon>
              <template #title>测试管理</template>
            </el-menu-item>
          </router-link>
          <router-link to="/wiki">
            <el-menu-item index="4">
              <el-icon><Management/> </el-icon>
              <template #title>知识管理</template>
            </el-menu-item>
          </router-link>
          <router-link to="/team">
            <el-menu-item index="5">
              <el-icon><ChatDotRound/></el-icon>
              <template #title>话题讨论</template>
            </el-menu-item>
          </router-link>


          <el-menu-item>
            <el-button @click="handleLogout">登出</el-button>
          </el-menu-item>

        </el-menu>
      </el-aside>
      <el-main class="px-0 py-0 grow w-full">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>

</style>