
export const state = () => ({
  user: {
    name: '',
    id: '',
    // ユーザーが現在入っているルームの情報
    room: {
      'chat': '',
      'file': '',
      'cast': ''
    }
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
  chat: {
    roomA: [{ name: 'ryo', content: 'おはよう' }, { name: 'ken', content: 'おはよう' }],
    roomB: [{ name: 'ryo', content: 'あああ' }, { name: 'ken', content: 'iiii' }]
  },
  files: {
    roomC: [{ name: '過去問A', icon: 'mdi-file-pdf-outline', id: '222' }, { name: '練習問題A', icon: 'mdi-file-pdf-outline', id: '444' }],
    roomD: [{ name: '練習問題', icon: 'mdi-pdf', id: '555' }]
  }
})

export const mutations = {
  setUser: (state, user) => (state.user = user),
  setJoinedRoom: (state, room) => (state.user.room[room.genre] = room.id),
  ADD_ROOMS: (state, rooms) => state.rooms.push(rooms),
  ADD_MESSAGE: (state, roomId, userName, msgContent) => state.chat[roomId].push({
    name: userName,
    content: msgContent
  })
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
        commit('ADD_MESSAGE', msg.lid, msg.username, msg.body)
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
  setJoinedRoom ({ commit }, room) {
    commit('setJoinedRoom', room)
  }
}
