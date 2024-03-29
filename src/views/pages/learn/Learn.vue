<template>
  <el-container>
    <el-main>
      <AppResponsive>
        <LearnTips />
        <div class="pt-3">
          <el-row v-for="item in sentences" :key="item.id">
            <div>
              <div class="font-bold">{{ item.en }}</div>
              <div>{{ item.vi }}</div>
            </div>
            <el-divider class="m-0 mt-2 mb-2"></el-divider>
          </el-row>
        </div>
        <div v-if="error">
          {{ error }}
        </div>
      </AppResponsive>
    </el-main>
    <el-footer height="auto">
      <AppResponsive>
        <div class="pb-3">
          <audio
            id="audio"
            autoplay
            class="w-full"
            controls="controls"
            :src="srcAudio"
            type="audio/mp3"
            controlsList="nodownload"
          />
        </div>
        <el-row :gutter="12" type="flex" class="m-0">
          <el-col>
            <el-button
              :loading="isLoading"
              plain
              type="primary"
              class="w-full"
              @click="play(speed.SLOW)"
            >
              <i v-if="!isLoading" class="el-icon-video-play"></i>
              <span>Nghe 0.6x</span>
            </el-button>
          </el-col>
          <el-col>
            <el-button
              :loading="isLoading"
              type="primary"
              plain
              class="w-full"
              @click="play(speed.NORMAL)"
            >
              <i v-if="!isLoading" class="el-icon-video-play"></i>
              <span>Nghe 1.0x</span>
            </el-button>
          </el-col>
          <el-col>
            <el-button
              :loading="isLoading"
              plain
              class="w-full"
              type="success"
              @click="complete"
            >
              <i v-if="!isLoading" class="el-icon-check"></i>
              <span>Đã xong</span>
            </el-button>
          </el-col>
        </el-row>
      </AppResponsive>
    </el-footer>
  </el-container>
</template>

<script>
import { Speed } from "@/constants/app.constants";
import Sentence from "@/mixin/data/sentence";
import AppResponsive from "@/components/AppResponsive";
import LearnTips from "@/views/pages/learn/LearnTips";
import AudioUtils from "@/utils/audio.utils";

export default {
  name: "Learn",
  components: { LearnTips, AppResponsive },
  created() {
    if (!this.activeSession || !this.activeSession.id) {
      this.replaceRouteName("Home");
    }
  },
  data() {
    return {
      isLoading: false,
      speed: Speed,
      srcAudio: null,
      cached: {},
      error: null
    };
  },
  computed: {
    sentences() {
      const sentenceIds = this.activeSession.sentences || [];
      return Sentence.filter(item => sentenceIds.includes(item.id));
    }
  },
  methods: {
    resetTime() {
      const audio = document.getElementById("audio");
      audio.currentTime = 0;
    },
    async play(speed) {
      try {
        this.isLoading = true;
        if (this.cached[speed]) {
          this.resetTime();
          this.srcAudio = this.cached[speed];
          return;
        }
        const sentenceIds = this.activeSession.sentences;
        this.srcAudio = await AudioUtils.getConcatenatedAudioFiles(
          sentenceIds,
          speed,
          this.config.paddingTime,
          this.config.sentenceRepeat
        );
        this.cached[speed] = this.srcAudio;
        this.$nextTick(() => {
          setTimeout(() => {
            document.getElementById("audio").play();
          }, 1000);
        });
      } catch (e) {
        this.$message.success(e.message);
        this.error = e;
      } finally {
        this.isLoading = false;
      }
    },
    async complete() {
      await this.$confirm("Bạn đã nghe đủ 3 lần trong ngày chưa?", "Xác nhận", {
        cancelButtonText: "Chưa",
        confirmButtonText: "Rồi"
      });
      this.completeSession();
      this.replaceRouteName("Home");
    }
  }
};
</script>

<style scoped></style>
