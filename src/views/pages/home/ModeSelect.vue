<template>
  <div>
    <div v-if="activeSession && activeSession.id" class="text-center">
      <div class="pb-3">
        <el-button plain type="primary" class="w-full" @click="resumeSession">
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
    <template v-else>
      <div v-for="item in choices" :key="item.value" class="pb-3">
        <el-button :icon="item.icon" class="w-full" @click="handleChoice(item)">
          <span>{{ item.label }}</span>
        </el-button>
      </div>
    </template>
  </div>
</template>

<script>
import { SessionType } from "@/constants/learn.constants";

export default {
  name: "ModeSelect",
  data() {
    return {
      choices: [
        {
          icon: "el-icon-caret-right",
          label: "Học 5 câu mới",
          type: SessionType.LEARN,
          value: 5
        },
        {
          icon: "el-icon-refresh-left",
          label: "Ôn tập 25 câu",
          type: SessionType.REVIEW,
          value: 25
        },
        {
          icon: "el-icon-refresh-left",
          label: "Ôn tập 50 câu",
          type: SessionType.REVIEW,
          value: 50
        }
      ]
    };
  },
  computed: {},
  methods: {
    handleChoice(choice) {
      if (choice.type === SessionType.LEARN) {
        this.pushRouteName("Prepare");
      } else {
        this.pushRouteName("Review");
      }
    },
    resumeSession() {
      this.pushRouteName("Learn");
    },
    newSession() {
      this.clearActiveSession();
    }
  }
};
</script>

<style scoped></style>
