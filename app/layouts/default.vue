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
          <v-btn icon @click.stop="drawer = false">
            <v-icon>mdi-arrow-collapse-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app>
      <v-app-bar-nav-icon v-show="!drawer || !$vuetify.breakpoint.mdAndUp" @click.stop="drawer = !drawer" />
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
          icon: 'mdi-home',
          title: 'ホーム',
          to: '/rooms'
        },
        {
          icon: 'mdi-wechat',
          title: 'チャットルーム',
          to: '/chat'
        },
        {
          icon: 'mdi-folder-multiple',
          title: 'ファイル共有',
          to: '/file'
        },
        {
          icon: 'mdi-cast',
          title: '配信',
          to: '/cast'
        }
      ],
      category: [

      ],
      miniVariant: true,
      right: true,
      title: 'ROUCON'
    }
  },
  computed: {
  },
  methods: {

  }
}
</script>
