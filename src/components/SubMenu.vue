<script setup lang="ts">

import {Menu} from "../types/subMenu";
const {menu}= defineProps<{
  menu:Menu
}>()
console.log(menu.defaultPath)
</script>
<template>
  <template v-for="(part,i) in menu.menus">
        <el-menu-item-group :title="part.title">
          <el-menu-item
              v-for="(item,j) in part.items"
              :index="i + '-' + j"
              class="mr-4  rounded-md h-10 mb-4">
            <router-link :to="menu.defaultPath+ item.itemPath">
            <el-icon>
              <component :is="item.itemIcon"/>
            </el-icon>
            <el-text>{{item.itemName}}</el-text>
            </router-link>
          </el-menu-item>
        </el-menu-item-group>
  </template>
</template>
<style scoped>

</style>