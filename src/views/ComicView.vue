<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getComic, getComicThumb, getComicRes, setOwn } from '../api/comic.js'
import { formatDate, formatTimeDate } from '../utils/format.js'
import { filterTagType } from '../utils/filter.js'
import { storeToRefs } from 'pinia'
import { useConfigStore } from "../stores/config";
import { ElMessage } from 'element-plus';

const config = useConfigStore()
const { imageBlur } = storeToRefs(config)

const router = useRouter()
const route = useRoute()
var data = reactive({
    comic: {
        id: route.params['id']
    },
    des: {}
})
const getComicDetail = () => {
    getComic(data.comic.id).then((res) => {
        data.comic = res.data.comic
        data.des = {}
        for (var i in data.comic.tags) {
            if (!data.des[data.comic.tags[i].type]) {
                data.des[data.comic.tags[i].type] = []
            }
            data.des[data.comic.tags[i].type].push(data.comic.tags[i])
        }
    })
}
onMounted(() => {
    getComicDetail(data.comic.id)
})
const download = () => {
    window.open(getComicRes(data.comic.id), '_blank')
}
const changeOwn = () => {
    setOwn(data.comic.id, !data.comic.own).then((res) => {
        if (res.data.success) {
            ElMessage.success("成功")
        }
    })
}
</script>

<template>
    <div class="container">
        <el-space direction="vertical" fill style="width: 100%;">
            <div class="head">
                <img :src="getComicThumb($route.params.id)" alt="" class="image"
                    :style="{ filter: imageBlur ? '' : 'blur(10px)' }">
                <el-card shadow="never" class="detail">
                    <el-descriptions class="margin-top" :title="data.comic.title" :column="2">
                        <el-descriptions-item label="创建时间">
                            {{ formatTimeDate(data.comic.createTime) }}
                        </el-descriptions-item>
                        <el-descriptions-item label="编辑时间">
                            {{ formatTimeDate(data.comic.updateTime) }}
                        </el-descriptions-item>
                        <el-descriptions-item label="发布日期" :span="2">
                            {{ formatDate(data.comic.publishTime) }}
                        </el-descriptions-item>
                        <el-descriptions-item v-for="(taglist, tagtype) in data.des" :label="filterTagType(tagtype)"
                            :span="2">
                            <el-space wrap>
                                <el-tag v-for="(tag, i) in taglist" @click="$router.push('/comics?tag=' + tag.id)">
                                    {{ tag.title }}
                                </el-tag>
                            </el-space>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </div>
            <el-card shadow="never">{{ data.comic.intro ? data.comic.intro : '暂无简介' }}</el-card>
        </el-space>
    </div>
</template>
<style scoped>
.image {
    height: 360px;
    width: 270px;
    margin: auto;
    padding: 0;
    border: 1px #aaa solid;
    border-radius: 5px;
    object-fit: cover;
}

.head {
    display: flex;
    align-content: center;
    justify-content: center;
}

.detail {
    flex-grow: 1;
    margin-left: 10px;
}

@media(max-width: 600px) {
    .head {
        flex-direction: column;
    }

    .detail {
        margin-left: 0px;
        margin-top: 10px;
    }
}
</style>