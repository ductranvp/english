<template>
  <el-row type="flex">
    <el-button
      :size="btnSize"
      :class="btnClass"
      :type="getButtonType('Home')"
      @click="pushRouteName('Home')"
    >
      <i class="el-icon-s-home"></i>
      <span>Trang Chủ</span>
    </el-button>
    <el-button
      :size="btnSize"
      :class="btnClass"
      :type="getButtonType('History')"
      @click="pushRouteName('History')"
    >
      <i class="el-icon-time"></i>
      <span>Lịch Sử</span>
    </el-button>
    <el-button
      :size="btnSize"
      :class="btnClass"
      :type="getButtonType('Option')"
      @click="pushRouteName('Option')"
    >
      <i class="el-icon-setting"></i>
      <span>Tùy Chọn</span>
    </el-button>
  </el-row>
</template>

<script>
export default {
  name: "MainHeader",
  data() {
    return {
      btnSize: "",
      btnClass: ""
    };
  },
  methods: {
    getButtonType(routeName) {
      if (this.$route.name === routeName) return "primary";
      return "";
    }
  }
};
</script>

<style scoped></style>
