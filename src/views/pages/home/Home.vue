<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center" class="p-3">
        <el-col :span="24" :sm="12" :md="8">
          <div v-if="activeSession && activeSession.id" class="text-center">
            <div class="pb-3">
              <el-button type="primary" class="w-full" @click="resumeSession">
                <i class="el-icon-caret-right"></i>
                <span>Tiếp tục bài học</span>
              </el-button>
            </div>
            <div class="pb-3">
              <el-button class="w-full" @click="newSession">
                <i class="el-icon-refresh-left"></i>
                <span>Tạo bài học mới</span>
              </el-button>
            </div>
          </div>
          <ModeSelect v-else />
          <div class="pb-3">
            <el-card shadow="never" class="leading-8">
              <div slot="header" class="font-medium">Thống Kê</div>
              <div>Số ngày đã học: {{ learnedDays.length }}</div>
              <div>Số câu đã học: {{ learnedSentences.length }} / 856</div>
              <div class="pb-3">
                <el-progress
                  :percentage="
                    ((learnedSentences.length / 856) * 100).toFixed(2)
                  "
                ></el-progress>
              </div>
              <div>
                <el-alert type="error" :closable="false">
                  <div class="text-sm text-center">
                    Xóa lịch sử duyệt web sẽ mất dữ liệu quá trình học
                  </div>
                </el-alert>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import ModeSelect from "@/views/pages/home/ModeSelect";
import { formatDate } from "@/utils/app.utils";

export default {
  name: "Home",
  components: { ModeSelect },
  computed: {
    learnedDays() {
      const days = this.allSessions.map(item =>
        formatDate(item.date, "DD/MM/YYYY")
      );
      return [...new Set(days)];
    }
  },
  methods: {
    resumeSession() {
      this.pushRouteName("Learn");
    },
    newSession() {
      this.clearActiveSession();
    }
  }
};
</script>
