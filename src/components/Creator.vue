<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted} from "vue";

const route = useRoute()
onMounted(()=>{

})
const work_type = route.params.work_type
</script>

<template>
这是用来新建项目|测试库|知识库|话题的地方

</template>

<style scoped>

</style>