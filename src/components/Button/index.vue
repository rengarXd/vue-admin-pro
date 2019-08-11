<template>
  <el-button @click="click" :type="type" :round="round" :icon="icon" :disabled="disabled">{{name}}</el-button>
</template>

<script>
export default {
  name: "Button",
  props: {
    name: String,
    type: {
      type: String,
      default: "primary"
    },
    round: Boolean,
    icon: String,
    disabled: Boolean
  },
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>