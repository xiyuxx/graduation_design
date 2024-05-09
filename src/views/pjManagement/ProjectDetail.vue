<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {Project} from "../../types/project";
import {useProjectStore} from "../../stores/project.ts";
import {formatDateTime} from "../../utils/time.ts";
import {Plus, Setting, Star, StarFilled} from "@element-plus/icons-vue";
import {useUserStore} from "../../stores/user.ts";

const useProject = useProjectStore()
const route = useRoute()
const logo = route.params.logo
const project = ref<Project>()
onMounted(async ()=>{
  await useProject.get_current_work_items()
  console.log(useProject.current_work_items)
})

const get_item_status = (row)=>{
  let status = row.status;
  if (status){
    if(status === 0){
      return "打开"
    }else if(status === 1){
      return "进行中"
    }else if(status === 2){
      return "已完成"
    }else if(status === 3){
      return "关闭"
    }else{
      return "未知"
    }
  }
  else{
    return "打开"
  }
}

const get_id = (row)=>{
  let logo:string = useProject.current_project!.logo
  return logo + "-" + row.id
}

const get_date_time = (row)=>{
  return formatDateTime(row.create_time)
}

const get_priority = (row)=>{
  if(row.priority){
    let pri = row.priority
    if(pri == 0){
      return "最高"
    }else if(pri == 1){
      return "较高"
    }else if(pri == 2){
      return "普通"
    }else if(pri == 3){
      return "较低"
    }else if(pri == 4){
      return "最低"
    }else {
      return "待定"
    }
  }
}

const get_father_item = (row) => {
  if(!row.father_item){
    return ""
  }
  return useProject.current_work_items.find(item => item.id == row.father_item).name
}

const useUser = useUserStore()
const handle_star = async (star:string, pro_id:string) => {
  console.log("点击了")
  await useProject.handle_star(star,pro_id,useUser.user_id)
}

const filter = ref("all")
</script>

<template>
  <el-container class="w-screen">
    <el-header class="border-b-2 inline-flex content-center w-full mb-0">
      <el-text :size="'large'" class="text-lg">{{useProject!.current_project!.name}} ></el-text>
      <el-divider direction="vertical" class="mt-5"></el-divider>
      <div class="flex-row content-center -mb-1.5 mx-2">
        <el-icon v-if="useProject.current_project!.if_star" class="text-yellow-500 text-lg"
                 @click.stop="handle_star((useProject.current_project!.if_star).toString(),useProject.current_project!.id)">
          <StarFilled />
        </el-icon>
        <el-icon v-else class="text-black"
                 @click.stop="handle_star((useProject.current_project!.if_star).toString(),useProject.current_project!.id)">
          <Star />
        </el-icon>
        <el-icon class="ml-2">
          <Setting></Setting>
        </el-icon>
      </div>
      <el-menu mode="horizontal" class="w-80" ellipsis >
        <el-menu-item class="text-lg">概览</el-menu-item>
        <el-menu-item class="text-lg">需求</el-menu-item>
        <el-menu-item class="text-lg">缺陷</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="w-full flex-col mt-0 p-0">
      <div class="w-full flex-col">
        <div class="inline-flex w-full justify-between content-center border-b-1">
          <el-menu mode="horizontal" class="w-full flex-row " :default-active="filter">
            <el-menu-item index="all">全部需求</el-menu-item>
            <el-menu-item index="feat">全部特性</el-menu-item>
            <el-menu-item index="user_story">全部用户故事</el-menu-item>
          </el-menu>
          <el-button class="">
            <Plus/>
            <el-text :size="'large'">新建</el-text>
          </el-button>
        </div>
      </div>
      <el-main class="w-full p-0">
        <el-table
          :data="useProject.show_work_items"
          border
          class="w-full"
        >
          <el-table-column type="index" :index="0"></el-table-column>
          <el-table-column :formatter="get_id" label="编号" sortable width="80"></el-table-column>
          <el-table-column prop="name" label="工作项" sortable width="150"></el-table-column>
          <el-table-column :formatter="get_item_status" label="状态" sortable width="100"></el-table-column>
          <el-table-column :formatter="get_father_item" label="父工作项" sortable width="120"></el-table-column>
          <el-table-column :formatter="get_priority" label="优先级" sortable width="100"></el-table-column>
          <el-table-column prop="description" label="负责人" sortable width="150"></el-table-column>
          <el-table-column :formatter="get_date_time" label="创建时间" sortable width="180"></el-table-column>
          <el-table-column prop="description" label="描述" sortable width="150"></el-table-column>
        </el-table>
      </el-main>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>