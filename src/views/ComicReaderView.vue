<script>
import VueGallery from 'vue-gallery';
import { getComicRes } from "../api/comic.js"
import JSZipUtils from 'jszip-utils'
import JSZip from 'jszip'

export default {
  data: function () {
    return {
      id: 0,
      images: [],
      index: null,
    };
  },
  mounted() {
    this.id = this.$route.params.id
    var _this = this
    JSZipUtils.getBinaryContent(getComicRes(_this.id), function (err, data) {
      if (err) {
        console.log("出错了")
        throw err;
      }
      JSZip.loadAsync(data).then(function (files) {
        let imageIndexs = {}
        let index = 0
        for (var file in files.files) {
          if (file.endsWith("jpg")) {
            imageIndexs[file] = index
            index += 1
            _this.images.push("")
            const f = () => {
              let index2 = imageIndexs[file]//parseInt(file.split("/").pop().split('.')[0]);
              files.files[file].async("base64").then((one) => {
                _this.images[index2] = "data:image/jpg;base64," + one
              })
            }
            f()
          }
        }
      });
    });
  },
  components: {
    'gallery': VueGallery
  },
}
</script> 

<template>
  <div class="content">
    <gallery :images="images" :index="index" @close="index = null"></gallery>
    <div class="image" v-for="(image, imageIndex) in images" :key="imageIndex" @click="index = imageIndex"
      :style="{ backgroundImage: 'url(' + image + ')', width: '240px', height: '320px' }">
    </div>
  </div>
</template>

<style scoped>
.image {
  float: left;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ebebeb;
  margin: 5px;
}

.content {
  margin: 10px;
}
</style>
