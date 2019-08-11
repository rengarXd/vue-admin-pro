export const menus = [{
    path: '/studyCenter/train',
    component: 'Layout',
    hidden: false,
    redirect: '/studyCenter/training/team',
    meta: {
        title: '培训',
        icon: 'nested'
    },
    children: [
        {
            path: 'team',
            hidden: false,
            component: 'views/training/studyCenter/trainClass/team/index',
            meta: {
                title: '培训班',
                icon: ''
            },
        },
        {
            path: 'schedule',
            hidden: true,
            component: 'views/training/studyCenter/trainClass/schedule/index',
            meta: {
                title: '课程表',
                icon: ''
            },
        }
    ]
},
{
    path: '/studyCenter/trainrecord',
    component: 'Layout',
    redirect: '/studyCenter/trainrecord/practiceRecord',
    hidden: false,
    meta: {
        title: '培训记录',
        icon: 'nested'
    },
    children: [
        {
            path: 'studyRecord',
            hidden: false,
            component: 'views/training/components/studyRecord/index',
            meta: {
                title: '学习记录',
                icon: ''
            },
        },
        {
            path: 'practiceRecord',
            hidden: false,
            component: 'views/training/components/practiceRecord/index',
            meta: {
                title: '练习记录',
                icon: ''
            },
        },
        {
            path: 'examRecord',
            hidden: false,
            component: 'views/training/components/examRecord/index',
            meta: {
                title: '考试记录',
                icon: ''
            },
        },
    ]
}, {
    path: '/studyCenter/study',
    component: 'Layout',
    hidden: true,
    redirect: '/studyCenter/study/list',
    children: [
        {
            hidden: true,
            path: 'list',
            component: 'views/training/studyCenter/study/list',
            meta: {
                title: '学习列表',
                icon: ''
            },
        },
        {
            path: 'knowledge',
            hidden: true,
            component: 'views/training/studyCenter/study/study/pdf',
            meta: {
                title: '学习',
                icon: ''
            },
        },
        {
            hidden: true,
            path: 'practice',
            component: 'views/training/studyCenter/study/practice/index',
            meta: {
                title: '练习',
                icon: ''
            },
        },
        {
            hidden: true,
            path: 'examination',
            component: 'views/training/studyCenter/study/examination/index',
            meta: {
                title: '考试',
                icon: ''
            },
        }
    ]
},]
