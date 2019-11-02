
export const state = () => ({
  user: {
    name: '',
    id: '',
    // ユーザーが現在入っているルームの情報
    chat: { id: '', name: 'チャット' },
    file: { id: '', name: 'ファイル' },
    cast: { id: '', name: '配信' }
  },
  rooms: [],
  roominfo: {

  }

})

export const mutations = {
  setUser: (state, user) => (state.user = user),
  setRoom: (state, key) => (state.roominfo[key] = []),
  JoinedChat: (state, { roomId, roomName }) => (state.user.chat = { id: roomId, name: roomName }),
  JoinedFile: (state, { roomId, roomName }) => (state.user.file = { id: roomId, name: roomName }),
  JoinedCast: (state, { roomId, roomName }) => (state.user.cast = { id: roomId, name: roomName }),
  ADD_ROOMS: (state, rooms) => state.rooms.push(rooms),
  ADD_MESSAGE: (state, { id, body }) => state.roominfo[id].push(body),
  ADD_FILE: (state, { id, body }) => state.roominfo[id].push(body)
}

export const getters = {
  getChats (state) {
    return state.roominfo[state.user.chat.id]
  }
}

export const actions = {
  // 受信したルームの処理
  socket_rooms ({ commit, state }, json) {
    for (const key in json) {
      let room = null
      if (state[json[key]] === null || state[json[key]] === undefined) { commit('setRoom', json[key]) }
      switch (json[key][1]) {
        case 'c':
          room = {
            genre: 'chat',
            icon: '/wechat.svg',
            id: json[key],
            name: key
          }

          break
        case 's':
          room = {
            genre: 'file',
            icon: '/folder-multiple.svg',
            id: json[key],
            name: key
          }

          break
        case 'd':
          room = {
            genre: 'cast',
            icon: '/cast.svg',
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
  // 受信したデータ処理
  socket_put ({ commit, state }, msg) {
    console.log(JSON.stringify(msg))
    switch (msg.lid[1]) {
      // chat message
      case 'c':
        const chatDate = {
          name: msg.username,
          content: msg.body,
          mine: false
        }
        commit('ADD_MESSAGE', { id: msg.lid, body: chatDate })
        break
      // file
      case 's':
        const date = {
          name: msg.username,
          content: msg.body
        }
        commit('ADD_FILE', { id: msg.lid, body: date })
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
  setMessage ({ commit }, msg) {
    commit('ADD_MESSAGE', {
      id: msg.lid,
      body: {
        name: msg.username,
        content: msg.body,
        mine: true
      }
    })
  },
  setFile ({ commit }, msg) {
    commit('ADD_FILE', {
      id: msg.lid,
      body: {
        name: msg.username,
        content: msg.body
      }
    })
  },
  async setJoinedRoom ({ commit, state }, room) {
    try {
      const roomData = { roomId: room.id, roomName: room.name }
      switch (room.genre) {
        case 'chat':
          await commit('JoinedChat', roomData)
          break
        case 'file':
          await commit('JoinedFile', roomData)
          break
        case 'cast':
          await commit('JoinedCast', roomData)
          break
        default:
          break
      }
    } catch (error) {
      alert(error)
    }
  }
}
