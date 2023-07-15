import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
    const imageBlur = ref(true)
    function changeImageBlur() {
        imageBlur.value = !imageBlur.value
    }

    return { imageBlur, changeImageBlur }
})
