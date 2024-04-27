<script setup lang="ts">

</script>

<template>
<div class="container min-w-full">
  <el-container class="h-screen w-full">
    <el-header class="px-4 inline-flex items-center w-full shadow-md">
      <slot name="header"></slot>
    </el-header>
    <el-main>
      <slot name="content">
        <router-view/>
      </slot>
    </el-main>
  </el-container>
</div>
</template>

<style scoped>

</style>