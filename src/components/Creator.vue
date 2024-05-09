<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref, reactive, watch} from "vue";

import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import {pinyin} from "pinyin-pro";
import {useUserStore} from "../stores/user.ts";
import {useProjectStore} from "../stores/project.ts";
import {close_creator} from "../utils/window.ts";
import {useWikiStore} from "../stores/wiki.ts";

const useUser = useUserStore()
onMounted(()=>{
  useUser.get_members(useUser.org_id)
  console.log(useUser.members)
})

let useStore;
const types = ref("")
const route = useRoute()
const work_type = route.params.work_type
onMounted(()=>{
  if(work_type){
    if(work_type == 0){
      types.value = "项目"
      useStore = useProjectStore()
    }else if(work_type == 1){
      types.value = "测试库"
    }else if(work_type == 2){
      types.value = "空间"
      useStore = useWikiStore()
    }else if(work_type == 3){
      types.value = "话题"
    }else if(work_type == 4){
      types.value = "讨论"
    }
  }
})

const belong = ref("")
const name = ref("")
const is_private = ref("")
const logo = ref("")
const description = ref("")

interface RuleForm {
  belong:string
  name: string
  is_private:boolean
  logo:string
  description: string
  members:[]
}
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  belong:'',
  name: '',
  is_private:false,
  logo:"",
  description: '',
  members:[]
})

watch(
    ()=>ruleForm.name,
    (newValue)=>{
      let newLogo =  pinyin(newValue,{pattern:'first'}).toUpperCase().replace(/\s*/g,"")
      if(newLogo.length <= 4){
        ruleForm.logo = newLogo
      }
    }
)
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 2, max: 255, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  logo:[
    {required:true,message:'大写字母或数字，15个字符以内',trigger:'blur'},
    {min:1,max:15}
  ],
  description: [
    { required: false, message: 'Please input activity form', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined,ruleForm) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ruleForm)
      let res = useStore.create(ruleForm.name,ruleForm.logo,useUser.org_id,useUser.user_id)
      if(res){
          close_creator(work_type as number)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<template>
  <el-form
      ref="ruleFormRef"

      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="p-4 flex-col gap-y-5"
      :size='"large"'
      status-icon
  >
    <el-form-item :label="`${types}名称`" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item :label="`${types}标识`" prop="logo">
      <el-input v-model="ruleForm.logo" placeholder='大写字母或数字，15个字符以内'/>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="ruleForm.description" type="textarea" />
    </el-form-item>
    <el-form-item label="选择成员" prop="members">
      <el-select v-model="ruleForm.members" placeholder="成员" multiple>
        <el-option v-for="member in useUser.members" :label="member.name" :value="member.id"></el-option>
      </el-select>

    </el-form-item>
    <el-form-item class="flex-row-reverse">
      <el-button  @click="submitForm(ruleFormRef,ruleForm)">
        创建{{types}}
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>