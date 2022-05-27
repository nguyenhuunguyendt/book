import { createStore } from 'vuex'


export default createStore({
  state: {
    authenticated: false,
    books: [],
    userInfo: null
  },
  getters: {
    authenticated: state => state.authenticated,
    books: state => state.books,
    userInfo: state => state.userInfo
  },
  mutations: {
    setAuth(state, auth) {
      state.authenticated = auth
    },
    setBooks(state, books) {
      state.books = books
    },
    setUserInfo(state, user) {
      state.userInfo = user
    }
  },
  actions: {
    setAuth({ commit }, auth) {
      commit('setAuth', auth)
    },
    setUserInfo({ commit }, user) {
      commit('setUserInfo', user)
    },
  },
  modules: {
  }
})
