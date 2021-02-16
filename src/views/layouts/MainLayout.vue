<template>
  <el-container>
    <el-header height="auto" class="border">
      <MainHeader />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import MainHeader from "./MainHeader";

export default {
  name: "MainLayout",
  components: { MainHeader }
};
</script>

<style scoped></style>
