复制
<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6">注册</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="name" class="block font-medium mb-2">姓名</label>
          <input
              id="name"
              v-model="name"
              type="text"
              class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
              placeholder="输入你的姓名"
          />
        </div>
        <div class="mb-4">
          <label for="phone" class="block font-medium mb-2">电话</label>
          <input
              id="phone"
              v-model="phone"
              type="text"
              class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
              placeholder="输入你的电话号码"
          />
        </div>
        <div class="mb-4">
          <label for="company" class="block font-medium mb-2">企业名称</label>
          <input
              id="company"
              v-model="organization"
              type="text"
              class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
              placeholder="你的企业名称"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block font-medium mb-2">密码</label>
          <input
              id="password"
              v-model="password"
              type="password"
              class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
              placeholder="输入密码"
          />
        </div>
        <div class="mb-6">
          <label for="confirmPassword" class="block font-medium mb-2">确认密码</label>
          <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
              placeholder="确认你的密码"
          />
          <span v-if="password !== confirmPassword && confirmPassword !== ''" class="text-red-500 text-sm">密码不匹配</span>
        </div>
        <a href="/login" class="mb-4 block text-indigo-600 hover:underline">已有账号？点击这里登录</a>
        <button
            type="submit"
            class="w-full bg-indigo-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            :disabled="loading"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm mr-2"></span>
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useUserStore} from "../stores/user.js";
import {UserRegister} from "../types/user";
import {enter_workSpace} from "../utils/window.ts";

const name = ref('');
const phone = ref('');
const organization = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);

const userStore = useUserStore()
async function handleRegister() {
  if (password.value === confirmPassword.value) {
    loading.value = true;
    let new_user:UserRegister = {
      organization: organization.value,
      phone: phone.value,
      pwd: password.value,
      name:name.value
    }
    await userStore.register(new_user)
    if(userStore.if_login()){
      enter_workSpace()
    }
    // 提交注册信息
    loading.value = false;
  }
}


</script>