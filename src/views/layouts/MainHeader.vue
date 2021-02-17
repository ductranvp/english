<template>
  <div class="text-center">
    <el-button
      :size="btnSize"
      :type="getButtonType('Home')"
      @click="pushRouteName('Home')"
    >
      <i class="el-icon-s-home"></i>
      <span>Trang Chủ</span>
    </el-button>
    <el-button
      :size="btnSize"
      :type="getButtonType('History')"
      @click="pushRouteName('History')"
    >
      <i class="el-icon-time"></i>
      <span>Lịch Sử</span>
    </el-button>
    <el-button
      :size="btnSize"
      :type="getButtonType('Option')"
      @click="pushRouteName('Option')"
    >
      <i class="el-icon-setting"></i>
      <span>Tùy Chọn</span>
    </el-button>
  </div>
</template>

<script>
export default {
  name: "MainHeader",
  data() {
    return {
      btnSize: "small"
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
