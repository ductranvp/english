<template>
  <div>
    <div v-for="item in choices" :key="item.value" class="pb-3">
      <el-button class="w-full" @click="handleChoice(item)">
        <span>{{ item.label }}</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import { SessionType } from "@/constants/learn.constants";

export default {
  name: "ModeSelect",
  data() {
    return {
      choices: [
        { label: "Học 5 câu mới", type: SessionType.LEARN, value: 5 },
        {
          label: "Ôn tập 25 câu",
          type: SessionType.REVIEW,
          value: 25
        },
        {
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
    }
  }
};
</script>

<style scoped></style>
