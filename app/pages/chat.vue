<template>
  <v-row column justify-center align-center>
    <v-col xs="12" sm="12" md="8">
      <div v-for="chat in chat.roomA" :key="chat.id">
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
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Chat',
  components: {

  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['user', 'chat'])
  },
  methods: {

  }
}
</script>
