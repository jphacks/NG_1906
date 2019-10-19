
export const state = () => ({
  user: {
    name: '',
    id: '',
    // ユーザーが現在入っているルームの情報
    chat: '',
    file: '',
    cast: ''
  },
  rooms: [
    {
      genre: 'chat',
      icon: 'mdi-wechat',
      id: 'roomA',
      name: '雑談部屋１'
    },
    {
      genre: 'chat',
      icon: 'mdi-wechat',
      id: 'roomB',
      name: '雑談部屋２'
    },
    {
      genre: 'file',
      icon: 'mdi-folder-multiple',
      id: 'roomC',
      name: 'ファイル１'
    },
    {
      genre: 'file',
      icon: 'mdi-folder-multiple',
      id: 'roomD',
      name: 'ファイル２'
    }
  ],

  roomA: [{ name: 'ryo', content: 'おはよう' }, { name: 'ken', content: 'おはよう' }],
  roomB: [{ name: 'ryo', content: 'あああ' }, { name: 'ken', content: 'iiii' }],
  roomC: [{ name: '過去問A', icon: 'mdi-file-pdf-outline', id: '222' }, { name: '練習問題A', icon: 'mdi-file-pdf-outline', id: '444' }],
  roomD: [{ name: '練習問題', icon: 'mdi-pdf', id: '555' }],
  rc1: [],
  rc2: []

})

export const mutations = {
  setUser: (state, user) => (state.user = user),
  JoinedChat: (state, roomId) => (state.user.chat = roomId),
  JoinedFile: (state, roomId) => (state.user.file = roomId),
  JoinedCast: (state, roomId) => (state.user.cast = roomId),
  ADD_ROOMS: (state, rooms) => state.rooms.push(rooms),
  ADD_MESSAGE: (state, { id, index }) => state[id].push(index)
}

export const getters = {
  getChats (state) {
    const roomId = state.user.chat
    return state[roomId]
  }
}

export const actions = {
  socket_rooms ({ commit, state }, json) {
    alert(JSON.stringify(json))
    for (const key in json) {
      let room = null
      switch (json[key][1]) {
        case 'c':
          room = {
            genre: 'chat',
            icon: 'mdi-wechat',
            id: json[key],
            name: key
          }

          break
        case 's':
          room = {
            genre: 'file',
            icon: 'mdi-folder-multiple',
            id: json[key],
            name: key
          }

          break
        case 'd':
          room = {
            genre: 'cast',
            icon: 'mdi-cast',
            id: json[key],
            name: key
          }

          break
        default:
          alert('error')
          return
      }
      if (room === null) { return }
      commit('ADD_ROOMS', room)
    }
  },
  socket_put ({ commit, state }, msg) {
    switch (msg.lid[1]) {
      case 'c':
        const date = {
          name: msg.username,
          content: msg.body
        }
        alert('date:' + JSON.stringify(date))
        commit('ADD_MESSAGE', { id: msg.lid, index: date })
        // alert('msg' + JSON.stringify(state))
        break
      case 's':

        break
      case 'd':

        break
      default:
        alert('error')
    }
  },
  setUser ({ commit }, user) {
    commit('setUser', user)
  },
  async setJoinedRoom ({ commit, state }, room) {
    try {
      alert(JSON.stringify(room))
      switch (room.genre) {
        case 'chat':
          await commit('JoinedChat', room.id)
          alert(JSON.stringify(state.user))
          break
        case 'file':
          await commit('JoinedFile', room.id)
          break
        case 'cast':
          await commit('JoinedCast', room.id)
          break
        default:
          break
      }
    } catch (error) {
      alert(error)
    }
  }
}
