
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
  ADD_MESSAGE: (state, { id, index }) => state.roominfo[id].push(index)
}

export const getters = {
  getChats (state) {
    return state.roominfo[state.user.chat.id]
  }
}

export const actions = {
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
  socket_put ({ commit, state }, msg) {
    switch (msg.lid[1]) {
      case 'c':
        const date = {
          name: msg.username,
          content: msg.body,
          mine: false
        }
        commit('ADD_MESSAGE', { id: msg.lid, index: date })
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
  setMessage ({ commit }, msg) {
    commit('ADD_MESSAGE', {
      id: msg.lid,
      index: {
        name: msg.username,
        content: msg.body,
        mine: true
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
