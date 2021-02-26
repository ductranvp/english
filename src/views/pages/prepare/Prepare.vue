<template>
  <el-container>
    <el-main>
      <AppResponsive>
        <div class="pb-3">
          <el-alert :closable="false" center>
            <div class="text-center">
              <span class="text-base">
                Chọn {{ config.sentencePerLesson }} câu bất kỳ từ các danh mục
                phía dưới sau đó bấm
              </span>
              <span class="font-bold text-primary text-base"> Bắt đầu</span>
            </div>
          </el-alert>
        </div>
        <SentenceSelect @change="change" ref="select" />
      </AppResponsive>
    </el-main>
    <el-footer height="auto">
      <AppResponsive>
        <el-row type="flex" justify="space-between">
          <el-col>
            <el-tooltip :disabled="!selectedSentences.length">
              <div slot="content">
                <div
                  v-for="(item, index) in selectedSentences"
                  :key="item.id"
                  class="pb-2"
                >
                  <div>{{ index + 1 }}. {{ item.en }}</div>
                  <div>
                    <em>{{ item.vi }}</em>
                  </div>
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
