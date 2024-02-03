<script setup>
import { ElCard } from "element-plus"
import { reactive } from "vue";
import { home } from "../api/home";
import { getComicThumb } from "../api/comic";
import { storeToRefs } from 'pinia'
import { useConfigStore } from "../stores/config";

const config = useConfigStore()
const { imageBlur } = storeToRefs(config)

var data = reactive({
    home: {}
})
home().then((res) => {
    data.home = res.data.home
})
</script>

<template>
    <div class="container">
        <el-space wrap class="space">
            <el-card v-for="(item, index) in data.home.records" shadow="hover" class="card"
                :body-style="{ padding: '0px', background: `url('` + getComicThumb(item.first) + `')`, backgroundSize: '240px 320px', filter: imageBlur ? '' : 'blur(10px)' }"
                @click="$router.push('/comics?tag=' + item.id)">
                <div class="info">
                    <div class="title">{{ item.title}}</div>
                    <div>
                        <el-tag round effect="dark">{{ item.num }}</el-tag>
                    </div>
                </div>
            </el-card>
        </el-space>
    </div>
</template>

<style scoped>
.card {
    height: 320px;
    width: 240px;
}

.image {
    height: 320px;
    width: 240px;
}

.info {
    background-color: rgba(0, 0, 0, 0.6);
    width: 240px;
    height: 320px;
    padding: 10px 14px;
}

.title {
    color: white;
    font-size: x-large;
    font-weight: bolder;
}
</style>