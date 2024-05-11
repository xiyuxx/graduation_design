<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted,reactive } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {Plus, Search} from "@element-plus/icons-vue";
import {useUserStore} from "../../stores/user.ts";
import {useWikiStore} from "../../stores/wiki.ts";
import {buildTree} from "../../utils/buildTree.ts";
import {ElMessage} from "element-plus";
import {fetchAvatar} from "../../utils/avatar.ts";
import {formatDateTime} from "../../utils/time.ts";


export default {
  methods: {formatDateTime},
  computed: {
    Plus() {
      return Plus
    },
    Search() {
      return Search
    }
  },
  components: { Editor, Toolbar },
  setup: function () {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()



    const useWiki = useWikiStore()
    let show_menu = reactive([])
    // 模拟 ajax 异步获取内容
    onMounted(async () => {
      await useWiki.get_current_articles()
      show_menu = buildTree(useWiki.show_articles)

    })

    const toolbarConfig = {}
    const editorConfig = {placeholder: '请输入内容...'}

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }



    const useUser = useUserStore()
    const activeIndex = ref('0')

    // 标题、内容、更新人id，可能存在的父文章
    const title = ref("")
    // 内容 HTML
    const valueHtml = ref('')
    const current_id = ref('')
    const last_update = ref('')
    const update_name = ref('')
    const update_avatar = ref('')
    const showDoc = (article)=>{
      current_id.value = article.id
      title.value = article.title
      valueHtml.value = article.content
      last_update.value = article.last_update
      if(article.update_avatar){
        update_avatar.value = article.update_avatar
      }else{
        update_avatar.value = fetchAvatar(article.update_name)
      }
      update_name.value = article.update_name

    }
    const createDoc = async () =>{
       let res = await useWiki.create_article(
          useWiki.current_space.id,
          "无标题文档",
          "",
          useUser.user_id,
      )
      console.log(res)
      await useWiki.update_current_articles()

      console.log(useWiki.show_articles)
      if(res){
        ElMessage({
          message: '创建文档成功',
          type: 'success',
        })
      }else{
        ElMessage({
          message: '创建文档失败',
          type: 'error',
        })
      }
    }


    const handleDoc = async () => {
      console.log("开始修改文档")
      console.log(title.value,valueHtml.value)
      let res = await useWiki.set_article(useWiki.current_space.id,current_id.value.toString(),
      title.value,valueHtml.value,useUser.user_id)
      console.log("修改完成")
      await useWiki.update_current_articles()
      console.log(useWiki.show_articles)
    }
    return {
      useWiki,
      title,last_update,update_avatar,update_name,current_id,
      useUser,
      activeIndex,
      editorRef,
      valueHtml,
      show_menu,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleDoc,
      createDoc,
      showDoc
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
        <el-button :icon="Plus" class="h-full bg-gray-50" @click="createDoc"/>
      </div>
      <el-menu
          :default-active="activeIndex"
          active-text-color="#00000"
          background-color="#f3f4f6"
          class="py-4 h-auto"
      >
        <el-menu-item :index="article.id.toString()" v-for="article in useWiki.show_articles" @click="showDoc(article)">
          {{article.title}}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="h-full p-0 m-0">
      <div class="max-h-full">
        <div class="flex content-center justify-between p-2 items-center">
          <el-text :size="'large'"></el-text>
          <div class="flex items-center">
            <el-avatar :src="useUser.avatar" class="mr-4"></el-avatar>
            <el-button :disabled="update_name.length === 0" @click="handleDoc">发布</el-button>
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
            class="min-h-80"
            @onCreated="handleCreated"
        />
        <div v-if="update_name.length > 0" class="flex items-center ml-2">
          <el-avatar :src="update_avatar" class="mr-4"></el-avatar>
          <el-text>{{update_name}}</el-text>
          <el-divider direction="vertical"/>
          <el-text>{{formatDateTime(last_update)}}</el-text>
        </div>
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
