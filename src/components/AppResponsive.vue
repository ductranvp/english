<template>
  <el-row type="flex" justify="center" class="p-3">
    <el-col :span="24" :sm="16" :md="10" class="h-full">
      <slot></slot>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "AppResponsive"
};
</script>

<style scoped></style>
