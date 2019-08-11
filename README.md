# myadmin-ts

```
vue、vue-cli3、element-ui、vuex、vue-router、echarts图表组件、axios、nodejs、mock、webpack、yarn、serviceworker、vue-svgicon、scss预处理器

看vue文档，elementui文档；

需要先去官网安装yarn、nodejs。windows平台下都有自己的安装包(.msi)，直接下载安装即可；
```

# 安装vue/cli3
npm install -g @vue/cli

## 目录结构

本项目已经为你生成了一个完整的开发框架，下面是整个项目的目录结构。

```bash
├── public                     # 静态资源 (会被直接复制)
│   │── favicon.ico            # favicon图标
│   │── manifest.json          # PWA 配置文件
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源 (由 webpack 处理加载)
│   ├── components             # 全局组件
│   ├── directive              # 全局指令
│   ├── filters                # 全局过滤函数
│   ├── icons                  # svg 图标
│   ├── lang                   # 国际化
│   ├── layout                 # 全局布局
│   ├── pwa                    # PWA service worker 相关的文件
│   ├── router                 # 路由
│   ├── store                  # 全局 vuex store
│   ├── styles                 # 全局样式
│   ├── vendor                 # 第三方插件
│   ├── utils                  # 全局方法
│   ├── views                  # 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   ├── permission.js          # 权限管理
│   ├── settings.js            # 设置文件
├── tests                      # 测试
├── .browserslistrc            # browserslistrc 配置文件 (用于支持 Autoprefixer)
├── .editorconfig              # 编辑相关配置
├── .env.xxx                   # 环境变量配置,配置不同环境下的一些路径参数，如接口地址
├── .eslintignore              # 忽略lint配置
├── .eslintrc.js               # eslint 配置
├── babel.config.js            # babel-loader 配置
├── jest.config.js             # jest 单元测试配置
├── package.json               # package.json 依赖
├── postcss.config.js          # postcss 配置
├── tsconfig.json              # typescript 配置
└── vue.config.js              # vue-cli 配置
```

## 业务目录结构
```bash
├── api                        # 所有请求
│   ├── domain                 # 域管理模块
│   ├── system                 # 系统管理模块
│   ├── training               # 培训模块
```
```bash
├── views                        # 所有请求
│   ├── domain                 # 域管理模块
│   ├── system                 # 系统管理模块
│   ├── training               # 培训模块
```
## 终端进入文件夹执行如下操作
```
npm install
```
### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production 生成生产版本
```
npm run build:prod
```
### Lints and fixes files
```
npm run lint
```
### 观看生产文件的预览版
```
npm run preview
```