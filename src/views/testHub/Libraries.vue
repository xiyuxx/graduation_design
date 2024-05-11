<script setup lang="ts">

import {Star, StarFilled} from "@element-plus/icons-vue";
import {useUserStore} from "../../stores/user.ts";
import {useTestHubStore} from "../../stores/testHub.ts";
import {onMounted} from "vue";

const useUser = useUserStore()
const useHub = useTestHubStore()

onMounted(async ()=>{
  await useHub.get_all(useUser.user_id)
})
</script>

<template>
  <el-table
      :data="useTopic.topics"
      :default-sort="{prop:'name',order:'ascending'}"
      :size="'large'"
      @row-click="topic_click"
      class="w-full text-lg font-medium mt-8">
    <el-table-column prop="name" label="话题" sortable width="150" />
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