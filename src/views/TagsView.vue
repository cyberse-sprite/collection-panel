
<template>
    <div class="container">
        <el-space wrap>
            <el-tag v-for="(item, index) in data.tags" size="large" @click="$router.push('/comics?tag=' + item.id)">
                {{ item.value }}
                <el-tag round type="danger" size="small">{{ item.count }}</el-tag>
            </el-tag>
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