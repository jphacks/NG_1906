<template>
  <v-row column justify-center align-center>
    <v-col v-for="room in rooms" :key="room.id" md="3">
      <v-card
        class="mx-auto"
        max-width="344"
        @click="joinRoom(room)"
      >
        <v-card-title>
          <v-row justify="center">
            <p class="display-1 text--primary mx-auto">
              {{ room.name }}
            </p>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row justify="center">
            <div>
              <v-icon size="60px">
                {{ room.icon }}
              </v-icon>
            </div>
          </v-row>
          <br>
          <v-divider />
          <div class="text--primary" />
        </v-card-text>
        <v-card-actions />
      </v-card>
      <create-room class="fiexd_btn" />
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CreateRoom from '~/components/CreateRoom.vue'

export default {
  name: 'Rooms',
  components: {
    CreateRoom
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['user', 'rooms'])
  },
  methods: {
    ...mapActions(['setJoinedRoom']),
    async joinRoom (room) {
      await this.setJoinedRoom(room)
      await this.$router.replace('/' + room.genre)
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
