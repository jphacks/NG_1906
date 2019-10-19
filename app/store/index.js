
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
  SOCKET_ROOMS: (state, rooms) => state.rooms.push(rooms)
}

export const actions = {
  socket_rooms ({ commit }, json) {
    const rooms = []
    for (const key in json) {
      switch (json[key][1]) {
        case 'c':
          rooms.push(
            {
              genre: 'chat',
              icon: 'mdi-wechat',
              id: json[key],
              name: key
            }
          )
          break
        case 's':
          rooms.push(
            {
              genre: 'file',
              icon: 'mdi-folder-multiple',
              id: json[key],
              name: key
            }
          )
          break
        case 'd':
          rooms.push(
            {
              genre: 'cast',
              icon: 'mdi-cast',
              id: json[key],
              name: key
            }
          )
          break
        default:
          alert('error')
      }
    }
    commit()
  },
  setUser ({ commit }, user) {
    commit('setUser', user)
  },
  setJoinedRoom ({ commit }, room) {
    commit('setJoinedRoom', room)
  }
}
