const steps = [
  {
    element: '#slider-container',
    popover: {
      title: '侧边栏',
      description: '可访问的页面',
      position: 'right'
    },
    padding: 0
  },
  {
    element: '#hamburger-container',
    popover: {
      title: '展开收起',
      description: '打开和关闭边栏',
      position: 'bottom'
    }
  },
  {
    element: '#breadcrumb-container',
    popover: {
      title: '面包屑',
      description: '指示当前页面位置',
      position: 'bottom'
    }
  },
  {
    element: '#header-search',
    popover: {
      title: '页面搜索',
      description: '页面搜索，快速导航',
      position: 'left'
    }
  },
  {
    element: '#size-select',
    popover: {
      title: '切换尺寸',
      description: '切换系统全局大小',
      position: 'left'
    }
  },
  {
    element: '#tags-view-container',
    popover: {
      title: '标签视图',
      description: '您访问的页面的历史记录',
      position: 'bottom'
    },
    padding: 0
  },
]

export default steps
