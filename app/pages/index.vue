<template>
  <v-row column justify-center align-center>
    <v-col>
      <v-row>
        <v-col md="2" />
        <v-col md="4">
          <img sizes="10" :src="logo">
        </v-col>
        <v-col md="4">
          <v-text-field
            v-model="userName"
            color="white"
            solo
            :rules="nameRules"
            :counter="MaxNameLength"
            label="name"
            required
          />
          <v-spacer />
          <v-btn
            @click="AppStart()"
          >
            START
          </v-btn>
        </v-col>
        <v-col md="2" />
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

import ROUCON from '@/assets/ROUCON.png'
export default {
  layout: 'top',
  components: {
  },
  data () {
    return {
      logo: ROUCON,
      userName: '',
      MaxNameLength: 10,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= this.MaxNameLength || 'Name must be less than ' + this.MaxNameLength + ' characters'
      ]
    }
  },
  methods: {
    ...mapActions(['setUser']),
    async AppStart () {
      await this.setUser({
        name: this.userName,
        id: '111111',
        icon: ''
      })
      // this.$socket.client.emit('join', this.userName)
      this.$router.replace('/rooms')
    }
  }
}
</script>
