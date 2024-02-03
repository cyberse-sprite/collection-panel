
<template>
    <div class="container">
        <el-space direction="vertical" fill>
            <el-card v-for="(model, index) in data.tags" shadow="never">
                <template #header>
                    <el-text>{{ model.title }}</el-text>
                </template>
                <el-space wrap>
                    <el-tag v-for="(item, index2) in model.tags" size="large"
                        @click="$router.push('/comics?tag=' + item.id)">
                        {{ item.title }}
                        <el-tag round type="danger" size="small">{{ item.num }}</el-tag>
                    </el-tag>
                </el-space>
            </el-card>
        </el-space>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { tags } from '../api/tag.js'

var data = reactive({
    tags: []
})

tags().then((res) => {
    //console.log(res)
    data.tags = res.data.tags
})

</script>