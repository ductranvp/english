<template>
  <div class="w-full h-full" v-loading="isLoading">
    <el-row type="flex" justify="center">
      <el-col :span="24" :sm="16" :md="12">
        <el-collapse v-model="activeCategory" @change="handleChange" accordion>
          <el-collapse-item
            v-for="cat in categories"
            :key="cat.id"
            :name="cat.id"
          >
            <template slot="title">
              <el-row
                type="flex"
                align="middle"
                justify="space-between"
                class="w-full"
              >
                <el-col class="pl-3">
                  <span>{{ cat.name }}</span>
                </el-col>
                <div class="w-10 mr-3">
                  <el-tag size="mini" class="w-full text-center">
                    {{ cat.sentences.length }}
                  </el-tag>
                </div>
              </el-row>
            </template>
            <div v-if="cat.id === activeCategory" v-loading="cat.isLoading">
              <el-row
                type="flex"
                class="p-2"
                align="middle"
                justify="space-between"
                v-for="el in cat.sentences"
                :key="el.id"
              >
                <el-tooltip>
                  <div slot="content">
                    <div>{{ el.en }}</div>
                    <div>{{ el.vi }}</div>
                  </div>
                  <el-checkbox
                    v-model="el.checked"
                    :disabled="selected.length >= maxSelect && !el.checked"
                    @change="handleCheck"
                  >
                    <span>{{ el.en | truncate(80) }}</span>
                  </el-checkbox>
                </el-tooltip>
                <el-button size="mini" @click="skip(el)">Đã biết</el-button>
              </el-row>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { sleep, sortArray } from "@/utils/app.utils";
import Sentence from "@/mixin/data/sentence";
import Category from "@/mixin/data/category";
import { LearnStatus } from "@/constants/learn.constants";

export default {
  name: "SentenceSelect",
  data() {
    return {
      isLoading: false,
      activeCategory: null,
      categories: [],
      maxSelect: this.$route.params?.quantity || 10
    };
  },
  computed: {
    selected() {
      let data = [];
      this.categories.forEach(cat => {
        data = data.concat(cat.sentences.filter(item => item.checked));
      });
      return data;
    }
  },
  created() {
    this.parseData();
  },
  methods: {
    async parseData() {
      this.isLoading = true;

      const sentences = await Promise.all(
        Sentence.map(item => {
          const done = !!this.learnedSentences.find(el => el === item.id);
          const learning = !!(
            this.activeSession.sentences?.find(el => el === item.id) || null
          );
          item = {
            ...item,
            checked: false,
            status: done
              ? LearnStatus.DONE
              : learning
              ? LearnStatus.LEARNING
              : LearnStatus.DRAFT
          };
          return item;
        })
      );

      this.categories = await Promise.all(
        Category.map(item => {
          item.sentences = sentences.filter(
            el => el.categoryId === item.id && el.status === LearnStatus.DRAFT
          );
          item.sentences = sortArray(item.sentences, "id");
          item.isLoading = false;
          return item;
        })
      );
      this.isLoading = false;
    },
    handleCheck() {
      this.$emit("change", this.selected);
    },
    clearSelect() {
      this.categories.forEach(cat => {
        cat.sentences.forEach(item => {
          item.checked = false;
        });
      });
      this.$emit("change", this.selected);
    },
    skip(sentence) {
      this.saveLearnedSentences([sentence.id]);
      this.parseData();
    },
    async handleChange(val) {
      if (val) {
        const cat = this.categories.find(item => item.id === val);
        cat.isLoading = true;
        await sleep(500);
        cat.isLoading = false;
      }
    }
  }
};
</script>

<style scoped></style>
