<template>
  <AppResponsive>
    <el-row class="text-center">
      <el-button @click="clearHistory">
        <i class="el-icon-delete"></i>
        <span>Xóa toàn bộ lịch sử</span>
      </el-button>
    </el-row>
    <div style="min-width: 400px; overflow-x: auto">
      <DataTable :data="allSessions" show-index show-pagination class="w-full">
        <el-table-column label="T.Gian" sortable prop="date">
          <template slot-scope="{ row }">
            <div>
              <div>{{ row.date | format("HH:mm DD/MM/YY") }}</div>
            </div>
            <div class="line-clamp-1 break-normal">
              {{ row.date | fromNow }}
            </div>
          </template>
        </el-table-column>
        <!--      <el-table-column label="Số câu">-->
        <!--        <template slot-scope="{ row }">-->
        <!--          <span>{{ row.sentences.length }}</span>-->
        <!--        </template>-->
        <!--      </el-table-column>-->
        <el-table-column label="T.Thái"
          >-->
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
        <el-table-column slot="action" label="Thao tác">
          <template slot-scope="{ row }">
            <el-row>
              <el-col :span="24" :sm="12" class="p-1">
                <el-button
                  plain
                  type="primary"
                  @click="resume(row)"
                  size="mini"
                >
                  <i class="el-icon-reading"></i>
                  <span>Học</span>
                </el-button>
              </el-col>
              <el-col :span="24" :sm="12" class="p-1">
                <el-button plain type="danger" @click="resume(row)" size="mini">
                  <i class="el-icon-delete"></i>
                  <span>Xóa</span>
                </el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </DataTable>
    </div>
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
