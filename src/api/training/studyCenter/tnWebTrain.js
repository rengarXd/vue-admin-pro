import { request } from "@/utils/request"

export const getlistStudentTrainingClass = (page = 1, pageSize = 20) => request('/api-train/tip/rest/tn/study/listStudentTrainingClass', 'listStudentTrainingClass', { page, pageSize })
export const getlistStudentCoursesTable = (trainingClassId) => request('/api-train/tip/rest/tn/study/listStudentCoursesTable', 'listStudentCoursesTable', { trainingClassId })
// export const insert = (params) => request('/api-train/tip/rest/tn/tr/main/insert', 'insert', params)
// export const update = (params) => request('/api-train/tip/rest/tn/tr/main/update', 'update', params)
// export const deletor = (params) => request('/api-train/tip/rest/tn/tr/main/delete', 'delete', params)
// export const searchSelector = (params) => { return request('/api-train/tip/rest/tn/tr/main/searchSelector', 'searchSelector', params) }

// 获取培训班学员学习记录
export const listStudentLearnRcd = (params) => request('/api-train/tip/rest/tn/study/listStudentLearnRcd', 'listStudentLearnRcd', params);
// 获取培训班学员练习记录
export const listStudentExerciseRcd = (params) => request('/api-train/tip/rest/tn/study/listStudentExerciseRcd', 'listStudentExerciseRcd', params);
// 获取培训班学员练习记录
export const listStudentExamRcd = (params) => request('/api-train/tip/rest/tn/study/listStudentExamRcd', 'listStudentExamRcd', params);

// 获取培训班学员课程表课时对应的学习内容
export const listCTItemLearningInfos = (ctItemId) => request('/api-train/tip/rest/tn/study/listCTItemLearningInfos', 'listCTItemLearningInfos', { ctItemId });

// 获取培训班学员课程表课时对应的练习内容
export const listCTItemExerciseInfos = (ctItemId) => request('/api-train/tip/rest/tn/study/listCTItemExerciseInfos', 'listCTItemExerciseInfos', { ctItemId });

// 获取培训班学员课程表课时对应的学习内容
export const listCTItemExamInfos = (ctItemId) => request('/api-train/tip/rest/tn/study/listCTItemExamInfos', 'listCTItemExamInfos', { ctItemId });

// 获取练习/考试结果
export const getPracticeRst = (params) => request('/api-train/tip/rest/tn/study/getPracticeRst', 'getPracticeRst', params);

///////////////////////////////操作相关/////////////////////////////////
// 开始/结束学习
export const learnOpt = (params) => request('/api-train/tip/rest/tn/study/learnOpt', 'learnOpt', params);
// 开始练习/考试
export const beginPractice = (params) => request('/api-train/tip/rest/tn/study/beginPractice', 'beginPractice', params);

// 提交练习/考试内容（只针对问答题，背诵/对练题通过录音文件上传或websocket接口提交）
export const submitPractice = (params) => request('/api-train/tip/rest/tn/study/submitPractice', 'submitPractice', params);