<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6">登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="identifier" class="block font-medium mb-2">电话或邮箱</label>
          <input
              id="identifier"
              v-model="identifier"
              type="text"
              class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
              :class="{ 'border-red-500': identifierError }"
              placeholder="输入电话/邮箱"
              @input="validateIdentifier"
          />
          <p v-if="identifierError" class="text-red-500 text-sm mt-1">{{ identifierError }}</p>
        </div>
        <div class="mb-6">
          <label for="password" class="block font-medium mb-2">密码</label>
          <input
              id="password"
              v-model="password"
              type="password"
              class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
              placeholder="输入你的密码"
          />
        </div>
        <a href="/register" class="mb-4 block text-indigo-600 hover:underline">注册企业</a>
        <button
            type="submit"
            class="w-full bg-indigo-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            :disabled="loading"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm mr-2"></span>
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useUserStore} from "../stores/user.ts";
import {enter_workSpace} from "../utils/window.ts";

const identifier = ref('');
const password = ref('');
const identifierError = ref('');
const loading = ref(false);

function validateIdentifier() {
  if (!identifier.value) {
    identifierError.value = 'Please enter your phone or email';
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(identifier.value) && !/^1[3-9]\d{9}$/.test(identifier.value)) {
    identifierError.value = 'Please enter a valid phone or email';
  } else {
    identifierError.value = '';
  }
}


const useUser = useUserStore()
async function handleLogin() {
  if (!identifierError.value) {
    loading.value = true;
    // Perform login logic here
    let loginInfo = {
      login_key: identifier.value,
      pwd: password.value
    }
    await useUser.login(loginInfo)
    if(useUser.if_login()){
      console.log("可以登录啦")
      enter_workSpace()
    }else{
      // 重置所有字段
      identifier.value = '';
      password.value = '';
      identifierError.value = '密码和账号错误，请重新输入';
    }
    loading.value = false;
  }
}

</script>