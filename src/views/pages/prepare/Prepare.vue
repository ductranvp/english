<template>
  <el-container>
    <el-main>
      <AppResponsive>
        <SentenceSelect @change="change" ref="select" />
      </AppResponsive>
    </el-main>
    <el-footer height="auto">
      <AppResponsive>
        <el-row type="flex" justify="space-between">
          <el-col>
            <el-tooltip :disabled="!selectedSentences.length">
              <div slot="content">
                <div v-for="item in selectedSentences" :key="item.id">
                  <span>{{ item.en }}</span>
                </div>
              </div>
              <el-button size="medium">
                <span>Đã chọn: </span>
                <span>{{ selectedSentences.length }} câu</span>
              </el-button>
            </el-tooltip>
            <el-button @click="clearSelect" size="medium">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-col>
          <el-button
            :disabled="selectedSentences.length < config.sentencePerLesson"
            @click="next"
            type="primary"
            size="medium"
          >
            <span>Bắt đầu</span>
          </el-button>
        </el-row>
      </AppResponsive>
    </el-footer>
  </el-container>
</template>

<script>
import SentenceSelect from "@/views/pages/prepare/SentenceSelect";
import { SessionType } from "@/constants/learn.constants";
import AppResponsive from "@/components/AppResponsive";
export default {
  name: "Prepare",
  components: { AppResponsive, SentenceSelect },
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
