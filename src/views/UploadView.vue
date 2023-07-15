<script setup>
import { reactive } from 'vue';
import MyTags from '../components/MyTags.vue'
import MyComicUploader from "../components/MyComicUploader.vue"
import { getComicUploadInfo, postComic } from "../api/comic.js"
import { ElMessage } from 'element-plus';

var data = reactive({
    form: {
        title: "",
        origin: [],
        grade: false,
        gore: false,
        publishTime: "",
        activity: [],
        group: [],
        author: [],
        charactor: [],
        relationship: [],
        xp: [],
        intro: "",
        files: null
    },
    selections: {
        origin: [],
        author: [],
        charactor: [],
        relationship: [],
        xp: [],
        activity: []
    }
})
getComicUploadInfo().then((res) => {
    data.selections = res.data.selections
})

const confirm = () => {
    let params = new FormData()
    for (var i in data.form.files) {
        params.append("files", data.form.files[i])
    }
    const changedData = changeToComicEntity()
    params.append("comic", new Blob([JSON.stringify(changedData)], { type: "application/json" }))
    postComic(params).then((res) => {
        if (res.success) {
            ElMessage.success('添加成功')
        }
    })
}

const changeToComicEntity = () => {
    var tags = []
    var newForm = {}
    for (var key in data.form) {
        if (['origin', 'activity', 'group', 'author', 'charactor', 'relationship', 'xp'].includes(key)) {
            for (var tag in data.form[key]) {
                tags.push({
                    value: data.form[key][tag],
                    type: key
                })
            }
        } else {
            newForm[key] = data.form[key]
        }
    }
    newForm['tags'] = tags
    return newForm
}

</script>
<template>
    <div class="container">
        <el-card>
            <el-form label-width="120px">
                <el-form-item label="标题">
                    <el-input v-model="data.form.title"></el-input>
                </el-form-item>
                <el-form-item label="原作">
                    <my-tags v-model="data.form.origin" :selections="data.selections.origin"></my-tags>
                </el-form-item>
                <el-form-item label="发布日期">
                    <el-date-picker v-model="data.form.publishTime" type="date" placeholder="选择发布日期" />
                </el-form-item>
                <el-form-item label="分级">
                    <el-switch v-model="data.form.grade"></el-switch>
                </el-form-item>
                <el-form-item label="猎奇表现">
                    <el-switch v-model="data.form.gore"></el-switch>
                </el-form-item>
                <el-form-item label="文件">
                    <my-comic-uploader v-model="data.form.files"></my-comic-uploader>
                </el-form-item>
                <el-form-item label="展会">
                    <my-tags v-model="data.form.activity" :selections="data.selections.activity"></my-tags>
                </el-form-item>
                <el-form-item label="社团">
                    <my-tags v-model="data.form.group" :selections="data.selections.group"></my-tags>
                </el-form-item>
                <el-form-item label="作者">
                    <my-tags v-model="data.form.author" :selections="data.selections.author"></my-tags>
                </el-form-item>
                <el-form-item label="人物标签">
                    <my-tags v-model="data.form.charactor" :selections="data.selections.charactor"></my-tags>
                </el-form-item>
                <el-form-item label="关系标签">
                    <my-tags v-model="data.form.relationship" :selections="data.selections.relationship"></my-tags>
                </el-form-item>
                <el-form-item label="内容标签">
                    <my-tags v-model="data.form.xp" :selections="data.selections.xp"></my-tags>
                </el-form-item>
                <el-form-item label="介绍">
                    <el-input v-model="data.form.intro" type="textarea"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="confirm">确定</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>