<script setup lang="ts">

</script>

<template>
  <el-container class="pt-4 w-full h-full ">
    <el-aside class="border-r-2 border-r-gray-200 h-full w-60">
      <slot name="subMenu"></slot>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>