<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import {useUserStore} from "../../stores/user.ts";
import {useTopicStore} from "../../stores/topic.ts";
import {open_project} from "../../utils/window.ts";
import {WINDOW_TYPES} from "../../types/multiWindow.ts";
import {Star, StarFilled} from "@element-plus/icons-vue";

const useUser = useUserStore()
const useTopic = useTopicStore()
onMounted(async ()=>{
  await useTopic.get_all(useUser.user_id)
})

const handle_star = async (star:string, topic_id:string) => {
  await useTopic.handle_star(star,topic_id,useUser.user_id)
}

const topic_click = (row)=>{
  useTopic.current_topic = row
  console.log(useTopic.current_topic)
  open_project(WINDOW_TYPES.TOPIC, useTopic.current_topic!.logo)
}
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