
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
  setJoinedRoom: (state, room) => (state.user.room[room.genre] = room.id)
}

export const actions = {
  setUser ({ commit }, user) {
    commit('setUser', user)
  },
  setJoinedRoom ({ commit }, room) {
    commit('setJoinedRoom', room)
  }
}
