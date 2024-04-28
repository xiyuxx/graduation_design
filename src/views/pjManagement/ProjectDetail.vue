<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {Project} from "../../types/project";
import {useProjectStore} from "../../stores/project.ts";

const useProject = useProjectStore()
const route = useRoute()
const logo = route.params.logo
const project = ref<Project>()
onMounted(()=>{
  project.value = useProject.get_project_by_logo(logo.toString())
})
</script>

<template>

</template>

<style scoped>

</style>