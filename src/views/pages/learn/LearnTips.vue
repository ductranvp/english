<template>
  <el-row type="flex" class="w-full font-bold text-sm" justify="space-between">
    <el-col :span="8" class="pr-2">
      <el-tag class="w-full text-center">Sáng 0.6x</el-tag>
    </el-col>
    <el-col :span="8" class="pl-1 pr-1">
      <el-tag class="w-full text-center">Trưa 1.0x</el-tag>
    </el-col>
    <el-col :span="8" class="pl-2">
      <el-tag class="w-full text-center">Tối 0.6x</el-tag>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "LearnTips"
};
</script>

<style scoped></style>
