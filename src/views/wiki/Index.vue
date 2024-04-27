<script setup lang="ts">

import HomePage from "../../slots/TopBar.vue";
import { Management} from "@element-plus/icons-vue";
</script>

<template>
  <home-page>
    <template #header>
      <el-icon :size="20" color="green"> <Management/>
      </el-icon>
      <el-text class="px-4 ">测试管理</el-text>
    </template>
  </home-page>
</template>

<style scoped>

</style>