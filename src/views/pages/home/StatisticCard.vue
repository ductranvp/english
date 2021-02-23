<template>
  <el-card shadow="never" class="leading-8">
    <div slot="header" class="font-medium">
      <el-button type="text" class="p-0">
        <i class="el-icon-pie-chart"></i>
        <span>Thống Kê</span>
      </el-button>
    </div>
    <div>Số ngày đã học: {{ learnedDays.length }}</div>
    <div>Số câu đã học: {{ learnedSentences.length }} / 856</div>
    <div class="pb-3">
      <el-progress
        :percentage="Number(((learnedSentences.length / 856) * 100).toFixed(2))"
      ></el-progress>
    </div>
    <div>
      <el-alert type="warning" :closable="false">
        <div class="text-sm text-center">
          Xóa lịch sử sẽ mất dữ liệu quá trình học
        </div>
      </el-alert>
    </div>
  </el-card>
</template>

<script>
import { formatDate } from "@/utils/app.utils";

export default {
  name: "StatisticCard",
  computed: {
    learnedDays() {
      const days = this.allSessions.map(item =>
        formatDate(item.date, "DD/MM/YYYY")
      );
      return [...new Set(days)];
    }
  }
};
</script>

<style scoped></style>
