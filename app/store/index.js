
export const state = () => ({
  user: {
    name: '',
    id: ''
  },
  rooms: [
    {
      page: 'chat',
      icon: 'mdi-wechat',
      id: '222',
      name: '雑談部屋',
      users: [{ name: 'ryo', id: '1111' }]
    },
    {
      page: 'file',
      icon: 'mdi-folder-multiple',
      id: '333',
      name: 'ファイル島',
      users: [{ name: 'ryo', id: '1111' }]
    }
  ],
  chat: {
    roomA: [{ name: 'ryo', content: 'おはよう' }, { name: 'ken', content: 'おはよう' }],
    roomB: [{ name: 'ryo' }, { name: 'ken' }]
  },
  files: {
    roomA: [{ name: '過去問A', icon: 'mdi-file-pdf-outline', id: '' }, { name: '練習問題A', icon: 'mdi-file-pdf-outline', id: '' }],
    roomB: [{ name: '練習問題', icon: 'mdi-pdf' }]
  }
})

export const mutations = {
  setUser: (state, user) => (state.user = user)
}

export const actions = {
  setUser ({ commit }, user) {
    commit('setUser', user)
  }
}
