<template>
  <div v-loading="isLoading">
    <el-table
      class="w-full"
      :highlight-current-row="highlightCurrentRow"
      :default-expand-all="defaultExpandAll"
      :data="tableData"
      :size="tableSize"
      :default-sort="defaultSort"
      :fit="true"
      :row-class-name="rowClass"
      :border="border"
      :show-header="showHeader"
    >
      <slot name="expand">
        <!-- action definitions here -->
      </slot>

      <el-table-column
        v-if="showIndex"
        type="index"
        :index="indexMethod"
        width="36px"
        label="TT"
      >
      </el-table-column>

      <slot>
        <!-- column definitions here -->
      </slot>

      <slot name="action">
        <!-- action definitions here -->
      </slot>
    </el-table>
    <el-row
      v-if="showPagination"
      type="flex"
      justify="center"
      style="margin-top: 0.75rem"
    >
      <el-pagination
        background
        @current-change="onPageChange"
        @size-change="onSizeChange"
        :current-page.sync="tableConfig.currentPage"
        :page-count="tableConfig.pageCount"
        :page-sizes="tableConfig.pageSizes"
        :page-size="tableConfig.pageSize"
        :total="data.length"
        :layout="layout"
      />
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    layout: {
      default: "total, prev, pager, next"
    },
    border: Boolean,
    highlightCurrentRow: Boolean,
    showIndex: Boolean,
    defaultExpandAll: Boolean,
    tableSize: {
      type: String,
      default: "small"
    },
    data: {
      type: Array,
      required: true
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    defaultSort: {
      type: Object,
      default: function() {
        return { prop: "date", order: "descending" };
      }
    },
    rowClass: [String, Function]
  },
  created() {
    this.renderTable();
  },
  data() {
    return {
      isLoading: false,
      tableData: [],
      tableConfig: {
        totalElements: 0,
        currentPage: 1,
        pageCount: 4,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50, 100]
      }
    };
  },
  watch: {
    data: function() {
      this.renderTable();
    }
  },
  methods: {
    indexMethod(index) {
      return (
        index +
        1 +
        (this.tableConfig.currentPage - 1) * this.tableConfig.pageSize
      );
    },
    onSizeChange(size) {
      this.tableConfig.pageSize = size;
      this.renderTable();
    },
    onPageChange(page) {
      this.tableConfig.currentPage = page;
      this.renderTable();
    },
    renderTable() {
      if (!this.data.length) {
        this.tableData = [];
        return;
      }
      const startIndex =
        (this.tableConfig.currentPage - 1) * this.tableConfig.pageSize;
      const endIndex = this.tableConfig.currentPage * this.tableConfig.pageSize;
      if (this.data.length - 1 >= startIndex) {
        let temp = this.data;
        this.tableData = temp.slice(startIndex, endIndex);
      }
    }
  }
};
</script>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
