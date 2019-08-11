
import { getlistStudentTrainingClass, getlistStudentCoursesTable, beginPractice } from "@/api/training/studyCenter/tnWebTrain";
import { Message } from "element-ui";

const state = {
    n_time: "00:00:00",
    time_total: 0,
    classes: [],
    classes_total: 0,
    times: [],
    times_total: 0,
    trainingClassId: "",
    ctItemId: "",
    recordId: ""
}

const mutations = {
    SET_N_TIME: (state, n_time) => {
        state.n_time = n_time
    },
    SET_time_total: (state, time_total) => {
        // console.log(time_total);
        state.time_total = time_total
    },
    SET_CLASSES: (state, res) => {
        state.classes = res.items
        state.classes_total = res.total
    },
    SET_TIMES: (state, res) => {
        state.times = res.items
        state.times_total = res.total
    },
    SET_trainingClassId(state, trainingClassId) {
        state.trainingClassId = trainingClassId
    },
    SET_ctItemId(state, ctItemId) {
        state.ctItemId = ctItemId
    },
    SET_recordId(state, recordId) {
        state.recordId = recordId
    }
}
const actions = {
    async getClasses({ commit }, info) {
        let page = 1;
        let pageSize = 20;
        if (info) {
            page = info.page;
            pageSize = info.pageSize;
        }
        let res = await getlistStudentTrainingClass(page, pageSize)
        commit('SET_CLASSES', res)
        if (!res.items.length) return
        commit('SET_TIMES', await getlistStudentCoursesTable(res.items[0].id))
    },
    async getCourseTime({ commit, state }, id) {
        if (!state.classes.length) return
        commit('SET_TIMES', await getlistStudentCoursesTable(id || state.classes[0].id))
    },
    setTime({ commit }, { timestr, time_total }) {
        // console.log(time_total)
        commit('SET_time_total', time_total - 1)
        commit('SET_N_TIME', timestr)
    },
    async begin({ commit, state }, info) {
        if (!state.trainingClassId || !state.ctItemId) return Message({
            message: "未取到培训班或者课程",
            type: 'error',
            duration: 2000
        })
        let { recordId } = await beginPractice({
            practiceType: info.studyType, // 1 练习，2 考试
            qsType: info.qsType,
            trainingClassId: state.trainingClassId, // 培训班id
            ctItemId: state.ctItemId, // 培训班课程表课时id
            questionId: info.questionId // 题目id
        })
        commit('SET_recordId', recordId)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
