<template>
  <v-container>
    <v-row column justify="center" align="center" style="height:50vw;">
      <v-col md="4" sm="12" cols="12" class="ml-auto">
        <img large :src="logo">
      </v-col>
      <v-col md="4" sm="12" cols="12" class="mr-auto">
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="userName"
                solo
                :rules="nameRules"
                :counter="MaxNameLength"
                label="name"
                required
              />
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-btn
                @click="AppStart()"
              >
                START
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col md="2" xs="0" sm="0" />
    </v-row>
  </v-container>
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
        name: this.userName
      })
      // this.$socket.client.emit('join', this.userName)
      this.$router.replace('/rooms')
    }
  }
}
</script>
