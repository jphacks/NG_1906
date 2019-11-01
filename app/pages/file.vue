<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <v-col col="12">
        <v-card style="padding: 10px; margin-bottom: 10px; border: 3px dashed #333333;" outlined @dragleave.prevent="checkDrag($event, 'new', false)" @dragover.prevent="checkDrag($event, 'new', true)" @drop.prevent="onDrop">
          <div>
            <label>
              {{ msg2 }}
              <input type="file" style="display:none" @change="onDrop">
            </label>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row column justify-center align-center>
      <div v-if="files != null">
        <div v-for="(file, index) in files" :key="index">
          <div class="columns">
            <div class="column">
              <figure class="image is-square">
                <img :src="images[index]">
              </figure>
            </div>
            <div class="column">
              <p class="has-text-weight-semibold is-size-4 has-text-centerd">
                {{ file.name }}
              </p>
            </div>
            <div class="column">
              <p class="has-text-weight-semibold is-size-4 has-text-centerd">
                {{ file.type }}
              </p>
            </div>
            <div class="column">
              <p class="has-text-weight-semibold is-size-4 has-text-centerd">
                {{ file.size.toLocaleString() }} Byte
              </p>
            </div>
          </div>
        </div>
      </div>

      <v-col v-for="file in files[user.file]" :key="file.id" md="3">
        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-card-title>
            <v-row justify="center">
              <p class="display-1 text--primary mx-auto">
                {{ file.name }}
              </p>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row justify="center">
              <div>
                <v-icon size="100px">
                  {{ file.icon }}
                </v-icon>
              </div>
            </v-row>
            <br>
            <v-divider />
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="deep-purple accent-4"
            >
              ダウンロード
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Files',
  components: {
  },
  data () {
    return {
      isDrag: null,
      msg1: 'ここにファイルをドロップ。または',
      msg2: 'drop files here or click to upload',
      files: [],
      images: []
    }
  },
  computed: {
    ...mapState(['user', 'files'])
  },
  methods: {
    checkDrag (event, key, status) {
      this.isDrag = status ? key : null
      if (status) {
        this.msg1 = 'ドラッグ中'
        this.msg2 = 'ここにドロップしてください'
      } else {
        this.msg1 = 'ここにファイルをドロップ。または'
        this.msg2 = 'ここをクリックして選択'
      }
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
          this.images.push(reader.result)
          alert(reader.result)
        }
        reader.readAsDataURL(fileList[i])

        this.files.push(fileList[i])
      }
      this.msg1 = 'ドロップされました'
      this.msg2 = 'ファイル数は' + fileList.length + 'です。'
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
</style>
