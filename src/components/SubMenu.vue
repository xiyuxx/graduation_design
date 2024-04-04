<script setup lang="ts">
interface MenuItem{
  title: string,
  items:Item[]
}
interface Item{
  itemListIcon:string,
  itemList:string
}
  const menuItem = defineProps<MenuItem[]>()
</script>

<template>
  <div>
    <div v-for="menu in menuItem">
      <p>{{menu.title}}</p>
      <el-menu></el-menu>
    </div>
  </div>
</template>

<style scoped>

</style>