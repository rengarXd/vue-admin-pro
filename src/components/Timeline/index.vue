<template>
  <el-timeline :reverse="reverse">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      @click="clicked(activity.id)"
      :timestamp="activity.timestamp">
       <h4 style="margin: 0"> {{activity.content}}</h4>
      <slot></slot>
    </el-timeline-item>
  </el-timeline>
</template>

<script>
  export default {
    props: {
      activities: {
        type: Array,
        default: [
          {
            content: '活动按期开始',
            timestamp: '2018-04-15'
          },
          {
            content: '通过审核',
            timestamp: '2018-04-13'
          },
          {
            content: '创建成功',
            timestamp: '2018-04-11'
          }
        ]
      }
    },
    data() {
      return {
        reverse: true
      }
    },
    methods: {
      clicked(params) {
        this.$emit('clicked', params)
      }
    }
  }
</script>
