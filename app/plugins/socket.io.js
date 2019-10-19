import Vue from 'vue'
import io from 'socket.io-client'
import VueSocketIoExt from 'vue-socket.io-extended'

export default ({ store }) => {
  Vue.use(VueSocketIoExt, io('http://localhost:7000'), { store })
}
