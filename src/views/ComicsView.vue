<script setup>
import { ElCard, ElSpace, ElText, ElPagination, ElForm } from 'element-plus';
import { onMounted, reactive } from 'vue';
import { getComics, getComicThumb } from '../api/comic.js'
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia'
import { useConfigStore } from "../stores/config";

const config = useConfigStore()
const { imageBlur } = storeToRefs(config)

var data = reactive({
    comics: {
        current: 1,
        pages: 0
    },
    filter: {
        grade: 2,
        gore: 2,
        tag: 0,
        own: 2,
        language: ''
    }
})

const route = useRoute()

const getComicList = () => {
    getComics(data.comics.current, data.filter).then((res) => {
        if (res.success) {
            data.comics = res.data.comics
        }
    })
}
onMounted(() => {
    data.filter = {
        grade: 2,
        gore: 2,
        tag: 0,
        own: 2,
        language: ''
    }
    if (route.query.grade) {
        data.filter.grade = route.query.grade
    }
    if (route.query.gore) {
        data.filter.gore = route.query.gore
    }
    if (route.query.tag) {
        data.filter.tag = route.query.tag
    }
    if (route.query.own) {
        data.filter.own = route.query.own
    }
    if (route.query.language) {
        data.filter.language = route.query.language
    }
    getComicList()
})

const handleChange = () => {
    getComicList()
}

</script>

<template>
    <div class="container">
        <div>
            <!-- <el-card> -->
            <el-collapse>
                <el-collapse-item title="筛选设置" name="1">
                    <el-form label-width="120px" label-position="left">
                        <el-form-item label="分级">
                            <el-radio-group v-model="data.filter.grade" @update:model-value="handleChange">
                                <el-radio :label="0">全年龄</el-radio>
                                <el-radio :label="1">R18</el-radio>
                                <el-radio :label="2">全部</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="猎奇表现">
                            <el-radio-group v-model="data.filter.gore" @update:model-value="handleChange">
                                <el-radio :label="0">无</el-radio>
                                <el-radio :label="1">有</el-radio>
                                <el-radio :label="2">全部</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="实体">
                            <el-radio-group v-model="data.filter.own" @update:model-value="handleChange">
                                <el-radio :label="0">未拥有</el-radio>
                                <el-radio :label="1">已拥有</el-radio>
                                <el-radio :label="2">全部</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="语言">
                            <el-radio-group v-model="data.filter.language" @update:model-value="handleChange">
                                <el-radio label="简体中文">简体中文</el-radio>
                                <el-radio label="English">English</el-radio>
                                <el-radio label="日本語">日本語</el-radio>
                                <el-radio label="">全部</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
            <!-- </el-card> -->
        </div>
        <div class="page-box">
            <el-pagination background layout="prev, pager, next" :page-count="data.comics.pages"
                v-model:current-page="data.comics.current" @update:current-page="handleChange" />
        </div>
        <el-space wrap>
            <el-card v-for="(item, index) in data.comics.records" :body-style="{ padding: '0px' }" class="box"
                shadow="hover" @click="$router.push('/c/' + item.id)">
                <span class="flag-icon flag-icon-jp flag" v-if="item.language == '日本語'"></span>
                <span class="flag-icon flag-icon-cn flag" v-if="item.language == '简体中文'"></span>
                <span class="flag-icon flag-icon-gb flag" v-if="item.language == 'English'"></span>
                <img :src="getComicThumb(item.id)" alt="" class="image" :style="{ filter: imageBlur ? '' : 'blur(10px)' }">
                <div class="title">
                    <el-icon v-if="item.own">
                        <StarFilled />
                    </el-icon>
                    <el-text truncated>
                        {{ item.title }}
                    </el-text>
                </div>
                <!-- <div class="tags">
                    <el-space>
                        <template v-for="(tag, i) in item.tags">
                            <el-tag v-if="['relationship', 'charactor'].includes(tag.type)">{{ tag.value }}</el-tag>
                        </template>
                    </el-space>
                </div> -->
            </el-card>
        </el-space>
    </div>
</template>

<style scoped>
.image {
    width: 240px;
    height: 320px;
    object-fit: cover;
}

.box {
    width: 240px;
    height: 360px;
}

.page-box {
    width: fit-content;
    margin: 10px auto;

}

.title {
    margin: 2px 12px;
    display: flex;
    align-items: center;
}

.tags {
    margin: 2px 12px;
}

.flag {
    position: absolute;
    margin: 5px 10px 5px 210px;
    border: 1px #000 solid;
}
</style>