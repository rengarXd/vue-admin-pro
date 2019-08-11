import { getLists } from '@/api/domain/domain'

const state = {
    Lists: [],
    total: 0,
}

const mutations = {
    SET_LISTS: (state, Lists) => {
        state.Lists = Lists
    },
    SET_TOTAL: (state, total) => {
        state.total = total
    },
}
const actions = {
    async getLists({ commit }, info) {
        let { response: { items, total } } = await getLists(info)

        commit('SET_LISTS', items)
        commit('SET_TOTAL', total)
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
