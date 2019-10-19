<template>
  <v-row column justify-center align-center>
    <v-col xs="12" sm="12" md="8">
      <div v-for="chat in getChats" :key="chat.id">
        <v-row>
          <v-col col="2">
            {{ chat.name }}
          </v-col>
          <v-col col="10">
            {{ chat.content }}
          </v-col>
        </v-row>
        <v-divider />
      </div>
    </v-col>
    <v-col col="12">
      <v-form>
        <v-text-field
          v-model="message"
          outlined
          label="メッセージ"
        />
      </v-form>
      <v-btn @click="sendMessage()">
        送信
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Chat',
  components: {

  },
  data () {
    return {
      message: ''
    }
  },
  computed: {
    ...mapState(['user', 'chat']),
    ...mapGetters(['getChats'])
  },
  methods: {
    ...mapActions(['setMessage']),
    async sendMessage () {
      const msg = {
        lid: this.user.chat,
        username: this.user.name,
        body: this.message
      }

      this.setMessage(msg)
      await this.$socket.client.emit('put', msg)
      this.message = ''
    }
  }
}
</script>
