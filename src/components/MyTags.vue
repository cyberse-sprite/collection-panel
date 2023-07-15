<template>
  <el-space warp>
    <el-tag size="large" v-for="tag in dynamicTags" :key="tag" class="mx-1" closable :disable-transitions="false"
      @close="handleClose(tag)">
      {{ tag }}
    </el-tag>
  </el-space>
  <el-autocomplete v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20"
    @select="handleInputConfirm" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" :fetch-suggestions="querySearch" />
  <el-button v-else class="button-new-tag ml-1" @click="showInput">
    + 添加
  </el-button>
</template>
  
<script setup>
import { ElMessage } from 'element-plus';
import { nextTick, onMounted, ref, watch } from 'vue'

const props = defineProps(['modelValue', 'selections'])
const emit = defineEmits(['update:modelValue', 'update:selections'])

const inputValue = ref('')
const dynamicTags = ref(props.modelValue)
const inputVisible = ref(false)
const InputRef = ref()

const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
  emit('update:modelValue', dynamicTags.value)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    //InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    if (!dynamicTags.value.includes(inputValue.value)) {
      dynamicTags.value.push(inputValue.value)
      emit('update:modelValue', dynamicTags.value)
    }else{
      ElMessage.info("标签已存在")
    }

  }
  inputVisible.value = false
  inputValue.value = ''
}

watch(() => props.modelValue, () => { dynamicTags.value = props.modelValue })

const tags = ref([])
watch(() => props.selections, () => { tags.value = props.selections })
onMounted(() => {
  tags.value = props.selections
  //console.log(props.selections)
})

const querySearch = (queryString, cb) => {
  //const results=tags.value
  const results = queryString
    ? tags.value.filter(createFilter(queryString))
    : tags.value
  // call callback function to return suggestions
  cb(results)
}

const createFilter = (queryString) => {
  return (theTag) => {
    return (
      theTag.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
</script>
  