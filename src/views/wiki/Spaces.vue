<script setup lang="ts">
import {useUserStore} from "../../stores/user.ts";

import {useRouter} from "vue-router";
import {inject, onMounted} from "vue";
import {useWikiStore} from "../../stores/wiki.ts";
import {open_project} from "../../utils/window.ts";
import {WINDOW_TYPES} from "../../types/multiWindow.ts";
import {Star, StarFilled} from "@element-plus/icons-vue";

const useUser = useUserStore()
const useWiki = useWikiStore()
const router = useRouter()
onMounted(async ()=>{
  await useWiki.get_all(useUser.user_id)
})

const title = inject('title')

const handle_star = async (star:string, pro_id:string) => {
  console.log(123123)
  console.log(star)
  await useWiki.handle_star(star,pro_id,useUser.user_id)
}

const wiki_click = (row)=>{
  useWiki.current_space = row
  console.log(useWiki.current_space)
  open_project(WINDOW_TYPES.WIKI, useWiki.current_space!.logo)
}
</script>

<template>
  <el-table
    :data="useWiki.spaces"
    :default-sort="{prop:'name',order:'ascending'}"
    :size="'large'"
    @row-click="wiki_click"
    class="w-full text-lg font-medium mt-8"
  >
    <el-table-column prop="name" label="空间" sortable width="150" />
    <el-table-column prop="if_star"  width="180">
      <template #default="setting" >
        <el-icon v-if="setting.row.if_star" class="text-yellow-500 text-lg" @click.stop="handle_star((!setting.row.if_star).toString(),setting.row.id)">
          <StarFilled />
        </el-icon>
        <el-icon v-else class="text-black" @click.stop="handle_star((!setting.row.if_star).toString(),setting.row.id)">
          <Star />
        </el-icon>
      </template>
    </el-table-column>
    <el-table-column prop="logo" label="标识" width="180" />
    <el-table-column prop="admin_name" label="管理员" width="180" />
    <el-table-column prop="last_update" label="更新时间" sortable width="180" />
  </el-table>
</template>

<style scoped>

</style>