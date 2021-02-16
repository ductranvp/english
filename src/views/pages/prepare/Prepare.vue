<template>
  <el-container>
    <el-main>
      <SentenceSelect @change="change" ref="select" />
    </el-main>
    <el-footer class="border" height="auto">
      <el-row type="flex" justify="space-between">
        <el-col>
          <el-tooltip :disabled="!selectedSentences.length">
            <div slot="content">
              <div v-for="item in selectedSentences" :key="item.id">
                <span>{{ item.en }}</span>
              </div>
            </div>
            <el-button>
              <span>Đã chọn: </span>
              <span>{{ selectedSentences.length }} câu</span>
            </el-button>
          </el-tooltip>
          <el-button @click="clearSelect">
            <i class="el-icon-delete"></i>
          </el-button>
        </el-col>
        <el-button @click="next" type="primary">
          <span>Bắt đầu</span>
        </el-button>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
import SentenceSelect from "@/views/pages/prepare/SentenceSelect";
import { SessionType } from "@/constants/learn.constants";
export default {
  name: "Prepare",
  components: { SentenceSelect },
  data() {
    return {
      selectedSentences: []
    };
  },
  methods: {
    change(value) {
      this.selectedSentences = value;
    },
    next() {
      this.createSession(SessionType.LEARN, this.selectedSentences);
      this.pushRouteName("Learn");
    },
    clearSelect() {
      this.$refs.select.clearSelect();
    }
  }
};
</script>

<style scoped></style>
