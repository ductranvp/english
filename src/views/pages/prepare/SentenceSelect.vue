<template>
  <div>
    <el-collapse v-model="activeCategory" accordion>
      <el-collapse-item v-for="cat in categories" :key="cat.id" :name="cat.id">
        <template slot="title">
          <el-row
            type="flex"
            align="middle"
            justify="space-between"
            class="w-full text-sm"
          >
            <el-col class="pl-3 text-warning">
              <span>{{ cat.name }}</span>
            </el-col>
            <div class="w-10 mr-3">
              <el-tag size="mini" class="w-full text-center">
                {{ cat.sentences.length }}
              </el-tag>
            </div>
          </el-row>
        </template>
        <div>
          <DataTable
            :data="cat.sentences"
            layout="prev, pager, next"
            :show-header="false"
          >
            <el-table-column prop="en">
              <div slot-scope="{ row }">
                <el-row type="flex" align="middle">
                  <div class="w-full overflow-ellipsis overflow-hidden">
                    <el-checkbox
                      :disabled="
                        selected.length >= config.sentencePerLesson &&
                          !row.checked
                      "
                      v-model="row.checked"
                      @change="handleCheck"
                      class="w-full"
                    >
                      <span>{{ row.en }}</span>
                    </el-checkbox>
                  </div>
                  <div class="text-right">
                    <el-button @click="skip(row)" size="mini">
                      <span>Đã biết</span>
                    </el-button>
                  </div>
                </el-row>
              </div>
            </el-table-column>
          </DataTable>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { sortArray } from "@/utils/app.utils";
import Sentence from "@/mixin/data/sentence";
import Category from "@/mixin/data/category";
import { LearnStatus } from "@/constants/learn.constants";
import DataTable from "@/components/DataTable";

export default {
  name: "SentenceSelect",
  components: { DataTable },
  data() {
    return {
      activeCategory: null,
      categories: []
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
    async skip(sentence) {
      await this.$confirm(
        "<div>Bạn chắc đã biết câu này chứ?</div>" +
          "<div class='font-bold'>" +
          sentence.en +
          "</div>",
        "Xác nhận",
        {
          cancelButtonText: "Hủy",
          confirmButtonText: "OK",
          dangerouslyUseHTMLString: true
        }
      );
      this.saveLearnedSentences([sentence.id]);
      this.parseData();
    }
  }
};
</script>

<style scoped></style>
