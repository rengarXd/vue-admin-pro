<template>
  <div class="recorder-container">
    <audio src v-if="isRecord" @play="played" :src="filepath" @pause="paused" ref="audioUpload"></audio>
    <span>{{timestr}}</span>
  </div>
</template>

<script>
export default {
  props: {
    isStart: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timestr: "00:00:00",
      isRecord: false,
      n_sec: 0,
      n_min: 0,
      n_hour: 0,
      n_timer: null,
      time_total: 0
    };
  },
  watch: {
    isStart(val) {
      console.log(val)
      if (val) {
        this.reStartTime();
      } else {
        // this.$store.commit("studyCenter/SET_time_total", this.time_total);
        this.$emit("time_result", {
          timestr: this.timestr,
          time_total: this.time_total
        });
        // this.$emit("time_total", this.time_total);
        this.initTime();
      }
    }
  },
  methods: {
    initTime() {
      if (this.n_timer) {
        clearInterval(this.n_timer);
        this.n_timer = null;
      }
      this.n_sec = 0;
      this.n_min = 0;
      this.n_hour = 0;
      this.time_total = 0;
    },
    reStartTime() {
      this.initTime();
      this.n_timer = this.timeUp();
    },
    timeUp() {
      return setInterval(() => {
        let str_hour = this.n_hour;
        let str_min = this.n_min;
        let str_sec = this.n_sec;
        if (this.n_sec < 10) {
          str_sec = "0" + this.n_sec;
        }
        if (this.n_min < 10) {
          str_min = "0" + this.n_min;
        }
        if (this.n_hour < 10) {
          str_hour = "0" + this.n_hour;
        }
        let time = `${str_hour}:${str_min}:${str_sec}`;
        this.time_total++;
        this.timestr = time;
        this.n_sec++;
        if (this.n_sec > 59) {
          this.n_sec = 0;
          this.n_min++;
        }
        if (this.n_min > 59) {
          this.n_min = 0;
          this.n_hour++;
        }

        if (this.n_hour > 24) {
          this.$message.warning("计时器以至最大时间，已重新开始计时！");
          this.reStartTime();
        }
      }, 1000);
    },
    played() {},
    paused() {}
  }
};
</script>

<style lang="scss" scoped>
.recorder-container {
  display: inline;
}
</style>