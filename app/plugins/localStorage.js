
import createPersistedState from 'vuex-persistedstate'

export default ({ store, isHMR, isClient }) => {
  window.onNuxtReady((nuxt) => {
    createPersistedState({
      paths: [
        'user',
        'chat',
        'file',
        'cast',
        'roominfo',
        'rooms'
      ]
    })(store) // vuex plugins can be connected to store, even after creation
  })
}
