<template>
  <v-container>
    <v-row align-center>
      <v-col
        v-for="room in rooms"
        :key="room.id"
        col="4"
        sm="4"
        md="2"
        lg="2"
      >
        <v-card
          class="mx-auto"
          height="150"
          @click="joinRoom(room)"
        >
          <div class="pl-4 pt-4">
            <h4 class="textOverFlow ">
              {{ room.name }}
            </h4>
          </div>
          <!-- $vuetify.breakpoint.mdAndUp" -->
          <v-img :src="room.icon" contain height="100" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Rooms',
  components: {

  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['user', 'rooms', 'userChat', 'userFile'])
  },
  methods: {
    ...mapActions(['setJoinedRoom']),
    joinRoom (room) {
      for (let i = 0; i < this.userChat.length; i++) {
        if (this.userChat[i].id === room.id) {
          return
        }
      }
      for (let i = 0; i < this.userFile.length; i++) {
        if (this.userFile[i].id === room.id) {
          return
        }
      }

      this.setJoinedRoom(room)
      this.$router.replace('/' + room.genre)
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
