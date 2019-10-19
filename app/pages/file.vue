<template>
  <v-row column justify-center align-center>
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
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Files',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['user', 'files'])
  },
  methods: {

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
