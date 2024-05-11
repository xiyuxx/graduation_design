<!-- CommentSection.vue -->
<template>
  <el-container class="w-screen h-screen">
    <el-aside class=" w-1/5 border-r-gray-300 border-r-2 bg-gray-100">
      <div class="inline-flex h-10">
        <el-input
            size="large"
            :prefix-icon="Search"
            placeholder="搜索"
        />
        <el-button :icon="Plus" class="h-full bg-gray-50" @click="createDiscuss"/>
      </div>
      <el-menu
          :default-active="activeIndex"
          active-text-color="#00000"
          background-color="#f3f4f6"
          class="py-4 h-auto"
      >
        <el-menu-item :index="discuss.id.toString()"
                      v-for="discuss in useTopic.current_discusses"
                      @click="showDiscuss(discuss)"

        >
          {{discuss.title}}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="h-full p-0 m-0">
      <div class="bg-white rounded-lg shadow-md p-6 h-full" v-show="activeIndex !== '-1'">
        <div class="mb-4">
          <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
          <div class="flex items-center mb-4">
            <el-avatar :src="user_avatar" class=""></el-avatar>
            <el-text class="pl-2 pr-4 text-gray-400">{{user_name}}</el-text>
            <el-text class="text-gray-400">{{last_update}}</el-text>
          </div>
          <div>{{content}}</div>
<!--          <el-text v-if="comment_count > 0" > {{comment_count}}条回复</el-text>-->
<!--          <el-text v-else class="text-lg">写回复</el-text>-->
          <el-divider/>
        </div>

        <div class="space-y-4">
          <div v-for="com in comment" :key="com.id" class="border-b pb-4">
            <div class="flex items-start">
              <div class="mr-4">
                <el-avatar :src="com.user_avatar"></el-avatar>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <h3 class="font-bold">{{ com.user_name }}</h3>
                  <span class="text-gray-500 text-sm">{{ com.create_time }}</span>
                </div>
                <p class="text-gray-700">{{ com.content }}</p>
                <div class="mt-2">

                  <el-button
                      type="text"
                      @click="toggleReplyForm(com)"
                      v-if="com.replies.length > 0"
                  >
                    查看 {{ com.replies.length }} 条回复
                  </el-button>
                  <el-button type="text" @click="toggleReplyForm(com)" v-else>
                    发表回复
                  </el-button>
                </div>
                <div v-if="com.show_reply" class="mt-2">
                  <div class="flex items-center">
                    <el-input
                        v-model="newReply"
                        placeholder="输入回复内容"
                        class="flex-1 mr-2"
                    ></el-input>
                    <el-button type="primary" @click="submitReply(com)">
                      发送
                    </el-button>
                  </div>
                  <div v-if="com.replies.length > 0" class="mt-4">
                    <div
                        v-for="reply in com.replies"
                        :key="reply.id"
                        class="border-l-4 border-gray-200 pl-4 pt-2"
                    >
                      <div class="flex items-start">
                        <div class="mr-4">
                          <img
                              :src="reply.user_avatar"
                              alt="User Avatar"
                              class="w-8 h-8 rounded-full"
                          />
                        </div>
                        <div class="flex-1">
                          <div class="flex justify-between items-center">
                            <h3 class="font-bold">{{ reply.user_name }}</h3>
                            <span class="text-gray-500 text-sm">{{ reply.create_time }}</span>
                          </div>
                          <p class="text-gray-700">{{ reply.content }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6">
          <el-input
              v-model="newComment"
              placeholder="输入评论内容"
              type="textarea"
              :rows="2"
          ></el-input>
          <div class="mt-2 flex justify-end">
            <el-button @click="submitComment">发送</el-button>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>

</template>

<script lang="ts">
import { ref ,onMounted,reactive} from 'vue'
import {Plus, Search} from "@element-plus/icons-vue";
import {useTopicStore} from "../../stores/topic.ts";

import {fetchAvatar} from "../../utils/avatar.ts";
import {formatDateTime, getCurrentTime} from "../../utils/time.ts";
import {useUserStore} from "../../stores/user.ts";
import {IComment} from "../../types/topic";
import http from "../../utils/axios.ts";
import {AllCommentResult, CommentCollector, ReqResult} from "../../types/result";
import {ElMessage} from "element-plus";

export default {
  computed: {
    Search() {
      return Search
    },
    Plus() {
      return Plus
    }
  },
  setup() {
    onMounted(async ()=>{
      if(useTopic.current_discusses.length === 0){
        await useTopic.get_current_discusses()
      }
    })

    const activeIndex = ref('-1')
    const topic = {
      id: 1,
      title: '如何使用 Vue.js 开发应用程序'
    }

    const comment = reactive<IComment[]>([])
    const req_comment = async ()=>{
      console.log("开始请求评论")
      comment.splice(0,comment.length)
      let topic_id = useTopic.current_topic!.id
      let discuss_id = current_id.value
      await http<ReqResult<AllCommentResult>>("/topic/comment",{
        method:'GET',
        params:{
          topic_id,discuss_id
        }
      }).then(req_info=>{
        let data = req_info.data
        if(data.success) {
          let comments = (data.data as CommentCollector).collector
          for(let i = 0; i < comments.length; i++){
            if(!comments[i].user_avatar){
              comments[i].user_avatar = fetchAvatar(comments[i].user_name)
            }
            comments[i].create_time = formatDateTime(comments[i].create_time)
            comment.push(comments[i])
            comment[i].show_reply = false
            comment[i].replies = []
          }
        }
      }).catch(err=>{
        ElMessage({
          type:'error',
          message:'请求回复数据出错'
        })
      })
    }

    const useTopic = useTopicStore()
    const current_id = ref('')
    const user_name = ref('')
    const user_avatar = ref('')
    const last_update = ref('')
    const title = ref('')
    const content = ref('')
    const comment_count = ref(0)
    const showDiscuss = async (discuss)=>{
      activeIndex.value = discuss.id.toString()
      current_id.value = discuss.id
      user_name.value = discuss.user_name
      if(discuss.user_avatar){
        user_avatar.value = discuss.user_avatar
      }else{
        user_avatar.value = fetchAvatar(discuss.user_name)
      }
      last_update.value = formatDateTime(discuss.last_update)
      title.value = discuss.title
      content.value = discuss.content
      comment_count.value = discuss.comment_count
      await req_comment()
      console.log("请求结果如何",comment)
    }
    const useUser = useUserStore()
    const createDiscuss = async ()=>{
      let res = await useTopic.create_discuss(
          useTopic.current_topic!.id,
          "新讨论",
          "-",
          useUser.user_id
      )
      await useTopic.get_current_discusses()
    }
    const comments = ref([
      {
        id: 1,
        content: '这是一条很好的评论',
        createdAt: '2023-05-10 14:30',
        user: {
          name: '张三',
          avatar: 'https://via.placeholder.com/150'
        },
        replies: [
          {
            id: 1,
            content: '我同意你的观点',
            createdAt: '2023-05-10 14:45',
            user: {
              name: '李四',
              avatar: 'https://via.placeholder.com/150'
            },
            comments: [
              {
                id: 1,
                content: '这很有道理',
                createdAt: '2023-05-10 15:00',
                user: {
                  name: '王五',
                  avatar: 'https://via.placeholder.com/150'
                }
              }
            ]
          }
        ],
        showReplyForm: false
      },
      {
        id: 2,
        content: '这篇文章很有帮助,谢谢作者',
        createdAt: '2023-05-10 15:00',
        user: {
          name: '王五',
          avatar: 'https://via.placeholder.com/150'
        },
        replies: [],
        showReplyForm: false
      }
    ])
    const newComment = ref('')
    const newReply = ref('')
    const toggleReplyForm = (target) => {
      target.showReplyForm = !target.showReplyForm
    }

    const submitComment = async () => {
      if (newComment.value.trim() !== '') {
        await useTopic.create_comment(useTopic.current_topic!.id,
        current_id.value.toString(),newComment.value,useUser.user_id)
        const new_comment:IComment = {
          content: newComment.value,
          create_time: getCurrentTime(),
          id: comment.length + 1,
          replies: [],
          reply_count: 0,
          show_reply: false,
          user_name: useUser.user_name,
          user_avatar:useUser.avatar,
        }
        comment.push(new_comment)
        const newCommentObj = {
          id: comments.value.length + 1,
          content: newComment.value,
          createdAt: '2023-05-10 16:00',
          user: {
            name: '你',
            avatar: 'https://via.placeholder.com/150'
          },
          replies: [],
          showReplyForm: false
        }
        comments.value.push(newCommentObj)
        newComment.value = ''
      }
    }
    const submitReply = (comment) => {
      if (newReply.value.trim() !== '') {
        const newReplyObj = {
          id: comment.replies.length + 1,
          content: newReply.value,
          createdAt: '2023-05-10 16:15',
          user: {
            name: '你',
            avatar: 'https://via.placeholder.com/150'
          },
          comments: []
        }
        comment.replies.push(newReplyObj)
        comment.showReplyForm = false
        newReply.value = ''
      }
    }

    return {
      useTopic,
      activeIndex,
      current_id,user_name,user_avatar,last_update,title,content,comment_count,
      comment,
      topic,
      comments,
      newComment,
      newReply,
      showDiscuss,createDiscuss,
      toggleReplyForm,
      submitComment,
      submitReply
    }
  }
}
</script>

<style>
/* 使用 Tailwind CSS 进行样式编写 */
</style>