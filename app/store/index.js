
export const state = () => ({
  user: {
    name: '',
    id: '',
    // ユーザーが現在入っているルームの情報
    chat: '',
    file: '',
    cast: ''
  },
  rooms: [],
  roominfo: {

  }

})

export const mutations = {
  setUser: (state, user) => (state.user = user),
  setRoom: (state, key) => (state.roominfo[key] = []),
  JoinedChat: (state, roomId) => (state.user.chat = roomId),
  JoinedFile: (state, roomId) => (state.user.file = roomId),
  JoinedCast: (state, roomId) => (state.user.cast = roomId),
  ADD_ROOMS: (state, rooms) => state.rooms.push(rooms),
  ADD_MESSAGE: (state, { id, index }) => state[id].push(index)
}

export const getters = {
  getChats (state) {
    const roomId = state.user.chat
    return state.roominfo[roomId]
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
    commit('ADD_MESSAGE', { id: msg.lid,
      index: {
        name: msg.username,
        content: msg.body,
        mine: true
      }
    })
  },
  async setJoinedRoom ({ commit, state }, room) {
    try {
      switch (room.genre) {
        case 'chat':
          await commit('JoinedChat', room.id)
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
