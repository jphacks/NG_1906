<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <v-col col="12">
        <v-card style="padding: 10px; margin-bottom: 10px; border: 3px dashed #333333;" outlined @dragleave.prevent="checkDrag($event, 'new', false)" @dragover.prevent="checkDrag($event, 'new', true)" @drop.prevent="onDrop">
          <div>
            <label>
              {{ msg }}
              <input type="file" style="display:none" @change="onDrop">
            </label>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify-center align-center>
      <v-col
        v-for="(file, index) in roominfo[user.room.id]"
        :key="index "
        col="4"
        sm="4"
        md="3"
        lg="2"
      >
        <v-card
          class="mx-auto"
          height="150"
          @click="downloadFile(file.content.data,file.content.name)"
        >
          <v-img
            :src="file.content.data"
            height="100"
          />

          <!-- {{file.type}} -->
          <div>
            <p class="textOverFlow">
              {{ file.content.name }}
            </p>
          </div>
          <!--
          <v-card-actions>
            <v-btn text>
              Share
            </v-btn>

            <v-btn
              color="purple"
              text
            >
              Explore
            </v-btn>

            <v-spacer />
          </v-card-actions>
          -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import { JSZip } from 'jszip'
import { saveAs } from 'file-saver'

export default {
  name: 'Files',
  components: {
  },
  data () {
    return {
      isDrag: null,
      msg: 'drop files here or click to upload',
      files: [],
      images: []
    }
  },
  computed: {
    ...mapState(['user', 'roominfo'])
  },
  methods: {
    ...mapActions(['setFile']),
    checkDrag (event, key, status) {
      this.isDrag = status ? key : null
      if (status) {
        // action
      } else {
        // action
      }
    },
    downloadFile (base64, fileName) {
      /*
      const zip = new JSZip()
      // for (let i = 0; i < this.fileList.length; i++) {
      zip.file('img.png', base64.split(',')[1], { base64: true })
      // }
      zip.generateAsync({ type: 'blob' })
        .then(function (content) {
         saveAs(content, 'images.zip')
        })
        */
      saveAs(this.toBlob(base64), fileName)
    },
    toBlob (base64) {
      // 日本語の文字化けに対処するためBOMを作成する。
      let blob
      try {
        // const bom = new Uint8Array([0xEF, 0xBB, 0xBF])

        const bin = atob(base64.replace(/^.*,/, ''))
        const buffer = new Uint8Array(bin.length)
        for (let i = 0; i < bin.length; i++) {
          buffer[i] = bin.charCodeAt(i)
        }
        // eslint-disable-next-line no-useless-escape
        const mimeType = base64.split(',')[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0]
        blob = new Blob([buffer.buffer], {
          type: mimeType
        })
      } catch (e) {
        return false
      }
      return blob
    },
    onDrop (event) {
      this.isDrag = null
      // ドロップされたファイル:event.target.files
      // ファイル選択ダイアログで選ばれたファイル:event.dataTransfer.files
      const fileList = event.target.files
        ? event.target.files
        : event.dataTransfer.files
      for (let i = 0; i < fileList.length; i++) {
        const reader = new FileReader()
        reader.onload = () => {
          // reader.resultはbase64にエンコードされたデータが入る
          // this.images.push(reader.result)
          const fileData = {
            lid: this.user.room.id,
            username: this.user.name,
            body: {
              name: fileList[i].name,
              data: reader.result
            }
          }
          this.sendFile(fileData)
        }
        reader.readAsDataURL(fileList[i])

        // this.files.push(fileList[i])
      }
    },
    async sendFile (fileData) {
      this.setFile(fileData)
      await this.$socket.client.emit('put', fileData)
    }
  }
}
</script>
<style>
.fixed_btn
{
  position: fixed;
  bottom: 70px;
  right: 50px;
  padding: 6px 40px;
}

.textOverFlow
{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
