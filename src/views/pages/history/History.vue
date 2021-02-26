<template>
  <AppResponsive>
    <el-row class="text-right">
      <el-button @click="clearHistory">Xóa toàn bộ lịch sử</el-button>
    </el-row>
    <DataTable :data="allSessions" show-index show-pagination>
      <el-table-column label="T.Gian" sortable prop="date">
        <template slot-scope="{ row }">
          <el-tooltip>
            <div slot="content">
              <div>{{ row.date | format("HH:mm DD/MM/YY") }}</div>
            </div>
            <div class="line-clamp-1 break-normal">
              {{ row.date | fromNow }}
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <!--      <el-table-column label="T.Thái">-->
      <!--        <template slot-scope="{ row }">-->
      <!--          <el-tag-->
      <!--            size="medium"-->
      <!--            type="warning"-->
      <!--            v-if="row.status === sessionStatus.IN_PROGRESS"-->
      <!--          >-->
      <!--            Chưa xong-->
      <!--          </el-tag>-->
      <!--          <el-tag-->
      <!--            size="medium"-->
      <!--            type="success"-->
      <!--            v-if="row.status === sessionStatus.COMPLETED"-->
      <!--          >-->
      <!--            Đã xong-->
      <!--          </el-tag>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
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
            <el-button
              plain
              type="primary"
              @click="resume(row)"
              size="mini"
              v-else
            >
              <span>Tiếp tục</span>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </DataTable>
  </AppResponsive>
</template>

<script>
import DataTable from "@/components/DataTable";
import { SessionStatus, SessionType } from "@/constants/learn.constants";
import AppResponsive from "@/components/AppResponsive";

export default {
  name: "History",
  components: { AppResponsive, DataTable },
  data() {
    return {
      sessionTypes: SessionType,
      sessionStatus: SessionStatus
    };
  },
  methods: {
    resume(row) {
      this.setActiveSession(row);
      this.pushRouteName("Learn");
    },
    async clearHistory() {
      try {
        await this.$confirm("Thao tác này không thể khôi phục lại", "Xác nhận");
        this.clearAllHistory();
      } catch (e) {
        //
      }
    }
  }
};
</script>

<style scoped></style>
