<script setup lang="ts">
interface TestProps{
  title:string
}
  const props = defineProps<TestProps>()
</script>

<template>
<div>{{props.title}}</div>
</template>

<style scoped>

</style>