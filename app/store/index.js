
export const state = () => ({
  user: {
    name: '',
    id: '',
    icon: ''
  },
  rooms: [
    {
      page: 'chat',
      icon: 'mdi-wechat',
      id: '222',
      name: '雑談部屋',
      users: [{ name: 'ryo', id: '1111', icon: '' }]
    },
    {
      page: 'file',
      icon: 'mdi-folder-multiple',
      id: '333',
      name: 'ファイル島',
      users: [{ name: 'ryo', id: '1111', icon: '' }]
    }
  ],
  chat: {
    roomA: [{ name: 'ryo', content: 'おはよう' }, { name: 'ken', content: 'おはよう' }],
    roomB: [{ name: 'ryo' }, { name: 'ken' }]
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
