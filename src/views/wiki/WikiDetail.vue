<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {Plus, Search} from "@element-plus/icons-vue";
import {useUserStore} from "../../stores/user.ts";
import {useWikiStore} from "../../stores/wiki.ts";
import {buildTree} from "../../utils/buildTree.ts";

export default {
  computed: {
    Plus() {
      return Plus
    },
    Search() {
      return Search
    }
  },
  components: { Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('<p>hello</p>')

    const useWiki = useWikiStore()
    let show_menu;
    // 模拟 ajax 异步获取内容
    onMounted(async () => {
      await useWiki.get_current_articles()
      show_menu = buildTree(useWiki.show_articles)
      setTimeout(() => {
        valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
      }, 1500)
    })

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    const handleDoc = ()=>{
      console.log(valueHtml.value)
    }

    const useUser = useUserStore()

    const activeIndex = ref('0')
    const title = ref("")



    return {
      useWiki,
      title,
      useUser,
      activeIndex,
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleDoc
    };
  }
}
</script>

<template>
  <el-container class="w-screen h-screen">
    <el-aside class=" w-1/5 border-r-gray-300 border-r-2 bg-gray-100">
      <div class="inline-flex h-10">
        <el-input
          size="large"
          :prefix-icon="Search"
          placeholder="搜索"
      />
        <el-button :icon="Plus" class="h-full bg-gray-50"/>
      </div>
      <el-menu
          :default-active="activeIndex"
          active-text-color="#00000"
          background-color="#f3f4f6"
          class="py-4 h-auto"
      >
        <el-menu-item v-for="article in useWiki.show_articles"></el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="h-full p-0 m-0">
      <div class="max-h-full">
        <div class="flex content-center justify-between p-2 items-center">
          <el-text :size="'large'">模板文件</el-text>
          <div class="flex items-center">
            <el-avatar :src="useUser.avatar" class="mr-4"></el-avatar>
            <el-button @click="handleDoc">发布</el-button>
          </div>

        </div>

        <Toolbar
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
            class="border-t-2"
        />

        <el-input placeholder="输入框" v-model="title"/>
        <Editor
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
        />
      </div>

    </el-main>
  </el-container>

</template>

<style scoped>
:deep(h1) {
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
:deep(h2) {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1.8rem;
  margin-bottom: 0.8rem;
}

/* h3 样式 */
:deep(h3)  {
  font-size: 1.75rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 0.6rem;
}

/* h4 样式 */
:deep(h4) {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1.2rem;
  margin-bottom: 0.4rem;
}

/* h5 样式 */
:deep(h5)  {
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 0.2rem;
}

</style>
