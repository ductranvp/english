<template>
  <el-row type="flex" justify="center" v-loading="isLoading">
    <el-col :span="24" :sm="18" :md="12">
      <DataTable :data="allSessions" show-index show-pagination>
        <el-table-column label="Date" sortable prop="date">
          <template slot-scope="{ row }">
            <span>{{ row.date | format("HH:mm DD/MM/YYYY") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Status">
          <template slot-scope="{ row }">
            <el-tag
              size="medium"
              v-if="row.status === sessionStatus.IN_PROGRESS"
            >
              In Progress
            </el-tag>
            <el-tag
              size="medium"
              type="success"
              v-if="row.status === sessionStatus.COMPLETED"
            >
              Completed
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Sentences">
          <template slot-scope="{ row }">
            <span>{{ row.sentences.length }}</span>
          </template>
        </el-table-column>
        <el-table-column slot="action" label="Action">
          <template slot-scope="{ row }">
            <div v-if="row.id !== activeSession.id">
              <el-button @click="resume(row)" size="mini">
                Review
              </el-button>
            </div>
            <el-tag v-else size="medium" type="success">
              <span>Learning</span>
            </el-tag>
          </template>
        </el-table-column>
      </DataTable>
    </el-col>
  </el-row>
</template>

<script>
import DataTable from "@/components/DataTable";
import { SessionStatus, SessionType } from "@/constants/learn.constants";
import { sleep } from "@/utils/app.utils";

export default {
  name: "History",
  components: { DataTable },
  data() {
    return {
      isLoading: false,
      sessionTypes: SessionType,
      sessionStatus: SessionStatus
    };
  },
  created() {
    this.preloading();
  },
  methods: {
    async preloading() {
      this.isLoading = true;
      await sleep(300);
      this.isLoading = false;
    },
    resume(row) {
      this.setActiveSession(row);
      this.pushRouteName("Learn");
    }
  }
};
</script>

<style scoped></style>
