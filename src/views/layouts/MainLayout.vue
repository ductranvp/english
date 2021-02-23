<template>
  <el-container>
    <el-header height="auto">
      <AppResponsive>
        <MainHeader />
      </AppResponsive>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import MainHeader from "./MainHeader";
import AppResponsive from "@/components/AppResponsive";

export default {
  name: "MainLayout",
  components: { AppResponsive, MainHeader }
};
</script>

<style scoped></style>
