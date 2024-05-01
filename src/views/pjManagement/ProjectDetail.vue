<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {Project} from "../../types/project";
import {useProjectStore} from "../../stores/project.ts";
import {formatDateTime} from "../../utils/time.ts";

const useProject = useProjectStore()
const route = useRoute()
const logo = route.params.logo
const project = ref<Project>()
onMounted(async ()=>{

  console.log(logo)
  console.log(project.value)
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
</script>

<template>
  <el-container class="w-full">
    <el-header>
{{useProject.show_work_items[1]}}
    </el-header>
    <el-main class="w-full">
      <el-header></el-header>
      <el-main class="w-full">
        <el-table
          :data="useProject.show_work_items"
          class="w-full"
        >
          <el-table-column :formatter="get_id" label="编号" sortable width="150"></el-table-column>
          <el-table-column prop="name" label="工作项" sortable width="150"></el-table-column>
          <el-table-column :formatter="get_item_status" label="状态" sortable width="150"></el-table-column>
          <el-table-column prop="name" label="工作项" sortable width="150"></el-table-column>
          <el-table-column prop="name" label="工作项" sortable width="150"></el-table-column>
          <el-table-column prop="name" label="工作项" sortable width="150"></el-table-column>
          <el-table-column :formatter="get_date_time" label="工作项" sortable width="180"></el-table-column>

        </el-table>
      </el-main>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>