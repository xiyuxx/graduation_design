<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import {Partner, Project} from "../../types/project";
import {useProjectStore} from "../../stores/project.ts";
import {formatDateTime} from "../../utils/time.ts";
import {Plus, Setting, Star, StarFilled} from "@element-plus/icons-vue";
import {useUserStore} from "../../stores/user.ts";
import http from "../../utils/axios.ts";
import {AllPartnerResult, PartnerCollector, ReqResult, SingleEditResult} from "../../types/result";
import {fetchAvatar} from "../../utils/avatar.ts";
import {Body} from "@tauri-apps/api/http";
import {ElMessage} from "element-plus";

const useProject = useProjectStore();
const route = useRoute();
const logo = route.params.logo;
const project = ref<Project>();
onMounted(async () => {
  if(useProject.current_work_items.length === 0){
    await useProject.get_current_work_items();
  }
});



const get_id = (row) => {
  let logo: string = useProject.current_project!.logo;
  return logo + "-" + row.id;
};

const get_date_time = (row) => {
  return formatDateTime(row.create_time);
};



const get_father_item = (row) => {
  if (!row.father_item) {
    return "";
  }
  return useProject.current_work_items.find(item => item.id == row.father_item).name;
};

const useUser = useUserStore();
const handle_star = async (star: string, pro_id: string) => {
  console.log("点击了");
  await useProject.handle_star(star, pro_id, useUser.user_id);
};

const handle_edit = (row) => {
  // Implement this function to handle editing of status and priority
  console.log("Editing row:", row);
};

const filter = ref("all");

const popoverVisible = ref(false);

const statusOptions = [
  { value: 0, label: '打开', color: '#66cae3' },  // Light Blue
  { value: 1, label: '进行中', color: '#b4b458' }, // Yellow
  { value: 2, label: '已完成', color: '#4cc74c' }, // Green
  { value: 3, label: '关闭', color: '#808080' }   // Gray
];

const priorityOptions = [
  { value: 0, label: '最高', color: '#f32626' },    // Red
  { value: 1, label: '较高', color: '#FF4500' },    // Orange Red
  { value: 2, label: '普通', color: '#b4b458' },    // Yellow
  { value: 3, label: '较低', color: '#66cae3' },    // Light Blue
  { value: 4, label: '最低', color: '#008000' }     // Green
];

const get_item_status = (row) => {
  const status = statusOptions.find(option => option.value === row.status);
  return status ? status.label : '';
};

const get_priority = (row) => {
  const priority = priorityOptions.find(option => option.value === row.priority);
  return priority ? priority.label : '';
};

const statusStyle = (statusValue) => {
  const status = statusOptions.find(option => option.value === statusValue);
  return {
    backgroundColor: status ? status.color : '#FFFFFF',
    padding: '5px 6px', // Adjusted padding for narrower background
    borderRadius: '18px',
    color: 'white',
    textAlign: 'center',
    marginBottom: '4px' // Added margin-bottom for spacing between options
  };
};

const priorityStyle = (priorityValue) => {
  const priority = priorityOptions.find(option => option.value === priorityValue);
  return {
    backgroundColor: priority ? priority.color : '#FFFFFF',
    padding: '5px 6px', // Adjusted padding for narrower background
    borderRadius: '18px',
    color: 'white',
    textAlign: 'center',
    marginBottom: '4px' // Added margin-bottom for spacing between options
  };
};

const handleEdit =async (row, field, newValue,if_req:boolean) => {
  row[field] = newValue;
  console.log('Updated row:', row);

  if(if_req){
    let body = Body.form({
      ...row
    })
    await http<ReqResult<SingleEditResult>>("/item/set_work_item",{
      method:"POST",
      body
    }).then(req_info=>{
      if(req_info.data.success){
        ElMessage({
          type:'success',
          message:"更新数据项成功"
        })
      }
    }).catch(err=>{
      console.log(err)
      ElMessage({
        type:'success',
        message:"更新数据项失败"
      })
    })
  }
  // 这里可以添加更多逻辑，如发送请求到服务器等
  popoverVisible.value = false; // Close the popover after selection
};

const partner = reactive<Partner[]>([])
onMounted(async ()=>{
  if(partner.length === 0){
    await http<ReqResult<AllPartnerResult>>("/project/work_mate",{
      method:"GET",
      params:{
        project_id:useProject.current_project!.id
      }
    }).then(req_info=>{
      let data = req_info.data
      if(data.success){
        let partners = (data.data as PartnerCollector).collector

        for (let i = 0; i < partners.length; i++){
          if(!partners[i].avatar){
            partners[i].avatar = fetchAvatar(partners[i].name)
          }
          partner.push(partners[i])
        }
      }
    })
  }
})

const handleSelectPartner = (row, selectedPartner) => {
  row.principal_name = selectedPartner.name;
  row.principal_avatar = selectedPartner.avatar;
  popoverVisible[row.id] = false; // 关闭对应行的弹窗
};

const selectPartnerAndUpdate = (row, selectedPartner) => {
  // 更新后端所需的负责人ID
  handleEdit(row, 'principal', selectedPartner.id,true);
  // 同时更新前端显示的负责人信息
  handleEdit(row, 'principal_name', selectedPartner.name,false);
  handleEdit(row, 'principal_avatar', selectedPartner.avatar,false);

  // 关闭弹出窗口
  popoverVisible[row.id] = false;
};





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
        <div class="flex items-center w-full justify-between content-center border-b-1">
          <el-menu mode="horizontal" class="w-full flex-row " :default-active="filter">
            <el-menu-item index="all">全部需求</el-menu-item>
            <el-menu-item index="feat">全部特性</el-menu-item>
            <el-menu-item index="user_story">全部用户故事</el-menu-item>
          </el-menu>
          <el-button >
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
          <el-table-column label="状态" width="100">
            <template #default="{row}">
              <el-popover placement="right" width="160" trigger="click" v-model="popoverVisible">
                <template #reference>
                  <div :style="statusStyle(row!.status)">
                    {{ get_item_status(row) }}
                  </div>
                </template>
                <div v-for="status in statusOptions" :key="status.value" @click="handleEdit(row, 'status', status.value,true)" :style="statusStyle(status.value)">
                  {{ status.label }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column :formatter="get_father_item" label="父工作项" sortable width="120"></el-table-column>
          <el-table-column label="优先级" width="100">
            <template #default="{row}">
              <el-popover placement="right" width="160" trigger="click" v-model="popoverVisible">
                <template #reference>
                  <div v-if="row!.priority !== undefined" :style="priorityStyle(row!.priority)">
                    {{ get_priority(row) }}
                  </div>
                </template>
                <div v-for="priority in priorityOptions" :key="priority.value" @click="handleEdit(row, 'priority', priority.value,true)" :style="priorityStyle(priority.value)">
                  {{ priority.label }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="负责人" width="200">
            <template #default="{row}">
              <el-popover placement="right" width="200" trigger="click" v-model="popoverVisible[row.id]">
                <template #reference>
                  <div style="display: flex; align-items: center; cursor: pointer;" @click="handleEdit(row, 'principal_name', row.principal_name,false)">
                    <img v-if="row.principal_avatar" :src="row.principal_avatar" alt="avatar" style="width: 30px; height: 30px; border-radius: 50%;">
                    <span v-if="row.principal_name">{{ row.principal_name }}</span>
                    <span v-else style="color: #ccc;">选择负责人</span>
                  </div>
                </template>
                <div v-for="p in partner" :key="p.id" @click="selectPartnerAndUpdate(row, p)" style="display: flex; align-items: center; margin-top: 10px; cursor: pointer;">
                  <img :src="p.avatar" alt="avatar" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
                  {{ p.name }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column :formatter="get_date_time" label="创建时间" sortable width="180"></el-table-column>
          <el-table-column prop="description" label="描述" sortable width="150"></el-table-column>
        </el-table>
      </el-main>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>