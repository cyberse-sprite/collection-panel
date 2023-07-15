<template>
    <input type="file" multiple @change="getFile($event)">
    <!-- <el-button @click="post">submit</el-button> -->
</template>
  
<script setup>
import { reactive,watch } from 'vue';

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

var data = reactive({
    files: null
})

watch(() => props.modelValue, () => { data.files = props.modelValue })

data.files = props.modelValue

const getFile = (event) => {
    data.files = event.currentTarget.files;
    emit('update:modelValue', data.files)
    //console.log(data.files)
}

</script>
  