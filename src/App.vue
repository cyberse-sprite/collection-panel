<script setup>
import { reactive } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { ElCard, ElButton } from 'element-plus';
import { useConfigStore } from './stores/config';
import { storeToRefs } from 'pinia'

const config = useConfigStore()
const { imageBlur } = storeToRefs(config)

var data = reactive({
  dark: false
})

</script>

<template>
  <el-card class="nav-box">
    <el-space>
      <el-button @click="$router.push('/')">首页</el-button>
      <el-button @click="$router.push('/tags')">标签</el-button>
      <el-button @click="$router.push('/comics')">漫画</el-button>
      <el-button @click="$router.push('/upload')">上传漫画</el-button>
      <el-switch v-model="imageBlur" inline-prompt active-text="清晰" inactive-text="模糊"></el-switch>
    </el-space>
  </el-card>
  <RouterView />
</template>
<style scoped>
.nav-box {
  width: 100%;
}
</style>
