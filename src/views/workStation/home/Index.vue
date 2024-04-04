<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {House} from "@element-plus/icons-vue";
import {ref} from "vue";

function getDateTimeInfo(): { period: string; dayOfWeek: string; month: number; day: number } {
  const date = new Date();
  const hour = date.getHours();
  const dayOfWeek = date.getDay();
  const month = date.getMonth() + 1; // JavaScript中的月份是从0开始计数的，所以要加1
  const day = date.getDate();

  let period = "";
  if (hour < 12) {
    period = "上午";
  } else if (hour < 18) {
    period = "下午";
  } else {
    period = "晚上";
  }

  const daysOfWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const dayOfWeekString = daysOfWeek[dayOfWeek];

  return { period, dayOfWeek: dayOfWeekString, month, day };
}

const { period, dayOfWeek, month, day } = getDateTimeInfo();
const route = useRoute()
const activeIndex = ref('0')
</script>

<template>
  <el-container class="pt-4 w-full">
    <el-aside class="border-r-2 border-r-gray-200 h-full">
      <div class="inline-flex items-center space-x-4 ">
        <el-avatar :size="50"></el-avatar>
        <div>
          <el-text>??,{{period}}好</el-text>
          <br>
          <el-text>今天是{{month}}月{{day}}，{{dayOfWeek}}</el-text>
        </div>
      </div>
      {{route.fullPath}}
      <el-divider/>
      <div>
        <el-menu class="w-full"
                 :default-active="activeIndex"
        >
          <el-menu-item
              index="0"
              class="mr-4 -my-4 rounded-md h-10"
          >
            <router-link to="/workStation/home/overview"/>
            <el-icon><House /></el-icon>
            <el-text>概览</el-text>
          </el-menu-item>
          <el-divider/>
        </el-menu>
      </div>
    </el-aside>
    <el-main>
      <RouterView></RouterView>
    </el-main>
  </el-container>

</template>

<style scoped>
:deep(.is-active){
  background-color: #d4e5fa !important;
  color: #32b2ff !important;

}

</style>