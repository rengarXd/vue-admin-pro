
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    this.events[eventName] = this.events[eventName] || [];
    this
      .events[eventName]
      .push(callback);
  }

  emit(eventName, _) {
    let events = this.events[eventName],
      args = Array
      .prototype
      .slice
      .call(arguments, 1),
      i,
      m;

    if (!events) {
      return;
    }
    for (i = 0, m = events.length; i < m; i++) {
      events[i].apply(null, args);
    }
  }
}
let currentWs = null;

class WS extends EventEmitter {
  constructor(vue) {
    super();
    if (currentWs) {
      // throw new Error('当前有未关闭的信道，请先关闭之前的信道，再打开新信道');
      this.socket = null
    }
    currentWs = this;

    //本地WebSocket连接
    this.socket = null;
    //本地socket的id，由后台服务器创建
    this.me = null;

    this.vue = vue;

    this.showTimeSplit = 500;
  }

  send(data) {
    // console.log(this.socket.readyState)
    if (this.socket.readyState === 1) {
      this
        .socket
        .send(JSON.stringify(data))
    } else {
      this.emit('socket_error')
    }
  }

  //本地连接信道，信道为websocket
  connect() {
    let socket,
      that = this;
    // console.log(this.vue.$store.state.wssUrl);
    socket = this.socket = new WebSocket(globals.WSS_URL);

    socket.onopen = function () {
      that.emit("init", '初始化成功')
    };

    socket.onmessage = function (message) {
      let json = JSON.parse(message.data);
      console.log(json)
    };

    socket.onerror = function (error) {
      // console.log(error);

      // that.emit("socket_error");
    };
    socket.onclose = function (data) {
      that.emit("socket_error");
      console.log(data);
    };
    return socket;
  }

  close() {
    this
      .socket
      .close();
    this.socket = null;

  }

  /**
   * 处理参数
   * @param json
   */
  paramsDetail(json) {
    let content = json.content;
    localStorage.setItem('taskCode', content.taskCode);
    localStorage.setItem('customerCode', content.customerCode);
    localStorage.setItem('verbalCode', content.verbalCode);
    // this.vue.$store.commit("SET_taskCode", content.taskCode);
    // this.vue.$store.commit("SET_customerCode", content.customerCode);
    // this.vue.$store.commit("SET_productCode", content.productCode);
    // this.vue.$store.commit("SET_verbalCode", content.verbalCode);
    // this.vue.$store.commit("SET_recordId", "");
    // this.emit('verbal_params', content)
  }
  /**
   * 采集客户特征或事件
   */
  featureEvents(json) {
    const that = this
    getCusFeaturesEvents().then(res => {
      let csFeatures = res.csFeatures;
      let csEvents = res.csEvents;
      // console.log(res)
      let newCsEvents = json.content.csEvents;
      let newCsFeatures = json.content.csFeatures;
      let resCsFeatures = [];
      let resCsEvents = [];
      newCsFeatures.forEach(item => {
        resCsFeatures.push(...csFeatures.filter(it => it.featureCode === item.featureCode && it.featureValue === it.featureValue))
      })
      newCsEvents.forEach(item => {
        resCsEvents.push(...csEvents.filter(it => it.eventCode === item.eventCode && it.occurTime === item.occurTime))
      })
      // console.log(resCsFeatures, resCsEvents)
      if (resCsFeatures.length) {
        that
          .vue
          .$store
          .commit("SET_allFe", Math.random());
        resCsFeatures.forEach(item => {
          setTimeout(() => {
            that.emit('featureEvents_update', {
              text: '特征采集：' + item.featureName + ':' + item.featureValueTitle,
              type: 'success'
            })
            // that
            //   .vue
            //   .$notify({
            //     title: item.featureName + ':' + item.featureValueTitle,
            //     // dangerouslyUseHTMLString: true,
            //     message: '客户特征已更新',
            //     type: 'success',
            //     offset: 100,
            //     showClose: false,
            //     customClass: 'animated bounceOut'
            //   });
          }, that.showTimeSplit)
        })
      }

      if (resCsEvents.length) {
        that
          .vue
          .$store
          .commit("SET_allFe", Math.random());
        resCsEvents.forEach(item => {
          setTimeout(() => {
            // 发送事件
            that.emit('featureEvents_update', {
              text: '事件采集：' + item.eventName,
              type: 'success'
            })
            // that
            //   .vue
            //   .$notify({
            //     title: item.eventName,
            //     // dangerouslyUseHTMLString: true,
            //     message: '客户事件已更新',
            //     // message: '特征：'+resCsFeatures.map(item => item.featureName).join(",")+
            //     // '<br/>事件：'+resCsEvents.map(item => item.featureName).join(","),
            //     type: 'success',
            //     offset: 100,
            //     showClose: false,
            //     customClass: 'animated bounceOut'
            //   });
          }, that.showTimeSplit)
        })
      }
    })
  }

  /**
   * 通知
   * @param {*} json
   * @memberof WS
   */

  notification(json) {
    const that = this;
    switch (json.content.mesgType) {
      case 1:
        result(json.content);
        break;
      case 2:
        break;
      case 3:
        break;
    }

    function result(params) {
      let text = null;
      switch (params.mesgCatalog) {
        case 5:
          // 发送事件
          text = params
            .mesgs
            .map(item => item.mesg)
            .join()
          break;
      }

      return that.emit('notification_product', {
        text: '产品卖点关注：' + text,
        type: 'success'
      })
    }
  }
}

export default WS
