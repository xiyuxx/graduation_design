<script setup lang="ts">

import {useProjectStore} from "../../stores/project.ts";
import {useUserStore} from "../../stores/user.ts";
import {inject, onMounted} from "vue";
import {Star, StarFilled} from "@element-plus/icons-vue";




const useUser = useUserStore()
const useProject = useProjectStore()

onMounted(async ()=>{
  console.log("开始请求数据")
  await useProject.get_all(useUser.user_id)
  console.log(useUser.user_id)
})

const title = inject('title')

const handle_star = async (star:string, pro_id:string) => {
  await useProject.handle_star(star,pro_id,useUser.user_id)
}

</script>

<template>
  <el-table
      :data="useProject.projects"
      :default-sort="{prop:'name',order:'ascending'}"
      :size="'large'"
      class="w-full text-lg font-medium mt-8">
    <el-table-column prop="name" label="项目" sortable width="150" />
    <el-table-column prop="if_star"  width="180">
      <template #default="setting" >
        <el-icon v-if="setting.row.if_star" class="text-yellow-500 text-lg" @click="handle_star((!setting.row.if_star).toString(),setting.row.id)">
          <StarFilled />
        </el-icon>
        <el-icon v-else class="text-black" @click="handle_star((!setting.row.if_star).toString(),setting.row.id)">
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