<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :fixed="fixed"
      :clipped="clipped"
      :permanent="drawer"
      app
    >
      <!-- permanet:app-barの下に固定される -->
      <v-list>
        <v-list-item>
          <v-btn v-if="!miniVariant" icon @click.stop="miniVariant = true">
            <img src="/arrow-collapse-left.svg">
          </v-btn>
          <v-btn v-if="miniVariant" icon @click.stop="miniVariant = false">
            <img src="/arrow-collapse-right.svg">
          </v-btn>
        </v-list-item>
        <v-list-item
          router
          exact
          to="/rooms"
        >
          <v-list-item-action>
            <img src="/home.svg">
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              ルーム
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--
        <v-list-item
          router
          exact
        >
          <v-list-item-action>
            <img src="/wechat.svg">
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              チャットルーム
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        -->
        <v-list-item
          v-for="chat in userChat"
          :key="chat.id"
          router
          exact
          @click="joinRoom(chat)"
        >
          <v-list-item-action>
            <img :src="chat.icon">
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="chat.name" />
          </v-list-item-content>
        </v-list-item>
        <!--
        <v-list-item
          router
          exact
        >
          <v-list-item-action>
            <img src="/folder-multiple.svg">
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              ファイル共有
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        -->
        <v-list-item
          v-for="file in userFile"
          :key="file.id"
          router
          exact
          @click="joinRoom(file)"
        >
          <v-list-item-action>
            <img :src="file.icon">
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="file.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app>
      <!-- <v-app-bar-nav-icon v-show="!drawer || !$vuetify.breakpoint.mdAndUp" @click.stop="drawer = !drawer" />-->
      <v-toolbar-title v-text="title" />

      <!--
      <v-btn icon @click.stop="clipped = true">
        <v-icon>B</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>C</v-icon>
      </v-btn>
    -->

      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>

import { mapState, mapMutations } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: '/home.svg',
          title: 'ホーム',
          to: '/rooms'
        },
        {
          icon: '/wechat.svg',
          title: 'チャットルーム',
          to: '/chat'
        },
        {
          icon: '/folder-multiple.svg',
          title: 'ファイル共有',
          to: '/file'
        },
        {
          icon: '/cast.svg',
          title: '配信',
          to: '/cast'
        }
      ],
      category: [

      ],
      miniVariant: false,
      right: true,
      title: 'ROUCON'
    }
  },
  computed: {
    ...mapState(['user', 'userChat', 'userFile'])

  },
  methods: {
    ...mapMutations(['joinRoom']),
    async joinRoom (room) {
      if (this.user.room.id === room.id) { return }
      await this.$store.commit('joinRoom', { id: room.id, name: room.name })
      await this.$router.replace('/' + room.genre)
    }
  }
}
</script>
