
import { list } from "@/api/system/usermanager";
const state = {
    Lists: [],
    total: 0
}

const mutations = {
    SET_LISTS: (state, Lists) => {
        state.Lists = Lists
    },
    SET_total: (state, total) => {
        state.total = total
    },
}
const actions = {
    // get user info
    async getLists({ commit }, data) {
        let res = await list(data)
        // console.log(res)
        commit('SET_LISTS', res.items)
        commit('SET_total', res.total)
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
