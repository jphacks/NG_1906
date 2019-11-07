
export const state = () => ({
  user: {
    name: '',
    id: '',
    // ユーザーが現在入っているルームの情報
    room: { id: '', name: '' }
  },
  userChat: [],
  userFile: [],
  rooms: [],
  roominfo: {

  }

})

export const mutations = {
  setUser: (state, user) => (state.user = user),
  setRoom: (state, key) => (state.roominfo[key] = []),
  joinRoom: (state, room) => (state.user.room = room),
  JoinedChat: (state, room) => (state.userChat.push(room)),
  JoinedFile: (state, room) => (state.userFile.push(room)),
  JoinedCast: (state, room) => (state.user.cast.push(room)),
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
      if (!(json[key] in state.roominfo)) {
        commit('setRoom', json[key])
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
    }
  },
  // 受信したデータ処理
  socket_put ({ commit, state }, msg) {
    // eslint-disable-next-line no-console
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
    commit('joinRoom', { id: room.id, name: room.name })
    try {
      switch (room.genre) {
        case 'chat':
          await commit('JoinedChat', room)
          break
        case 'file':
          await commit('JoinedFile', room)
          break
        case 'cast':
          await commit('JoinedCast', room)
          break
        default:
          break
      }
    } catch (error) {
      alert(error)
    }
  }
}
