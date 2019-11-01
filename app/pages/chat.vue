<template>
  <v-row column justify="center" align="center">
    <v-col xs="12" sm="12" md="8">
      {{ user.chat.name }}
      <v-container class="chat-container">
        <div v-for="chat in roominfo[user.chat.id]" :key="chat.id">
          <v-row>
            <v-col v-if="chat.mine" xs="10" sm="10" md="10">
              {{ chat.content }}
            </v-col>
            <v-col v-if="chat.mine" xs="2" sm="2" md="2">
              <v-chip
                class="ma-2"
                color="indigo"
                text-color="white"
              >
                {{ chat.name }}
              </v-chip>
            </v-col>
            <v-col v-if="!chat.mine" xs="2" sm="2" md="2">
              <v-chip
                class="ma-2"
                color="green"
                text-color="white"
              >
                {{ chat.name }}
              </v-chip>
            </v-col>
            <v-col v-if="!chat.mine" xs="10" sm="10" md="10">
              {{ chat.content }}
            </v-col>
          </v-row>
          <v-divider />
        </div>
      </v-container>
    </v-col>
    <v-form class="fixed_send" @submit.prevent="sendMessage()">
      <v-row>
        <v-col cols="10">
          <v-text-field
            v-model="message"
            solo
            outlined
            label="メッセージ"
          />
        </v-col>
        <v-col cols="2">
          <v-btn @click="sendMessage()">
            送信
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
    ...mapState(['user', 'chat', 'roominfo'])
    // ...mapGetters(['getChats'])
  },
  methods: {
    ...mapActions(['setMessage']),
    async sendMessage () {
      const msg = {
        lid: this.user.chat.id,
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

<style>
.fixed_send
{
  position: fixed;
  bottom: 10px;
  width: 80vw;
}
.chat-container{
  margin-bottom: 200px;
}
</style>
