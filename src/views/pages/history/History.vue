<template>
  <el-row type="flex" justify="center" v-loading="isLoading" class="p-3">
    <el-col :span="24" :sm="18" :md="12">
      <DataTable
        :row-class="tableRowClassName"
        :data="allSessions"
        show-index
        show-pagination
      >
        <el-table-column label="Ngày" sortable prop="date">
          <template slot-scope="{ row }">
            <div>{{ row.date | format("HH:mm") }}</div>
            <div>{{ row.date | format("DD/MM/YY") }}</div>
          </template>
        </el-table-column>
        <el-table-column label="Trạng thái">
          <template slot-scope="{ row }">
            <el-tag
              size="medium"
              type="warning"
              v-if="row.status === sessionStatus.IN_PROGRESS"
            >
              Chưa xong
            </el-tag>
            <el-tag
              size="medium"
              type="success"
              v-if="row.status === sessionStatus.COMPLETED"
            >
              Đã xong
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Số câu">
          <template slot-scope="{ row }">
            <span>{{ row.sentences.length }}</span>
          </template>
        </el-table-column>
        <el-table-column slot="action" label="Thao tác">
          <template slot-scope="{ row }">
            <div>
              <el-button
                @click="resume(row)"
                size="mini"
                v-if="row.status === sessionStatus.COMPLETED"
              >
                <span>Ôn lại</span>
              </el-button>
              <el-button type="primary" @click="resume(row)" size="mini" v-else>
                <span>Tiếp tục</span>
              </el-button>
            </div>
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
    tableRowClassName({ row }) {
      if (row.id === this.activeSession.id) {
        return "success-row";
      }
      return "";
    },
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
