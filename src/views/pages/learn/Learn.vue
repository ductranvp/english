<template>
  <el-row type="flex" justify="center" class="p-3">
    <el-col :span="24" :sm="18" :md="12" class="text-center">
      <el-alert type="warning" :closable="false" center>
        <el-row type="flex" class="w-full font-bold text-sm">
          <el-col :span="8">
            <div>Morning 0.6x</div>
          </el-col>
          <el-col :span="8">
            <div>Afternoon 1x</div>
          </el-col>
          <el-col :span="8">
            <div>Evening 0.6x</div>
          </el-col>
        </el-row>
      </el-alert>
      <div class="pt-3">
        <el-row type="flex" class="pb-3">
          <el-col :span="11">
            <el-button
              type="primary"
              class="w-full"
              @click="play(speed.NORMAL)"
              :disabled="isPlaying"
            >
              <i class="el-icon-video-play"></i>
              <span>Play 1x</span>
            </el-button>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-button
              :disabled="isPlaying"
              type="primary"
              class="w-full"
              @click="play(speed.SLOW)"
            >
              <i class="el-icon-video-play"></i>
              <span>Play 0.6x</span>
            </el-button>
          </el-col>
        </el-row>
        <el-row v-for="item in sentences" :key="item.id">
          <el-card shadow="never" class="mb-3">
            <div>{{ item.en }}</div>
            <div>{{ item.vi }}</div>
          </el-card>
        </el-row>
        <el-row type="flex">
          <el-button class="w-full" type="success" @click="complete">
            <i class="el-icon-check"></i>
            <span>Complete</span>
          </el-button>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { Speed } from "@/constants/app.constants";
import Sentence from "@/mixin/data/sentence";

export default {
  name: "Learn",
  created() {
    if (!this.activeSession || !this.activeSession.id) {
      this.replaceRouteName("Home");
    }
  },
  data() {
    return {
      isPlaying: false,
      speed: Speed
    };
  },
  computed: {
    sentences() {
      const sentenceIds = this.activeSession.sentences || [];
      return Sentence.filter(item => sentenceIds.includes(item.id));
    }
  },
  methods: {
    async play(speed) {
      this.isPlaying = true;
      const sentenceIds = this.activeSession.sentences;
      for (let i = 0; i < sentenceIds.length; i++) {
        await this.repeatAudio(sentenceIds[i], speed, 5);
      }
      this.isPlaying = false;
    },
    complete() {
      this.completeSession();
      this.replaceRouteName("Home");
    }
  }
};
</script>

<style scoped></style>
