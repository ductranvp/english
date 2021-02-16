<template>
  <div v-loading="isLoading">
    <el-table
      style="width: 100%"
      :highlight-current-row="highlightCurrentRow"
      :default-expand-all="defaultExpandAll"
      :data="tableData"
      :size="tableSize"
      :default-sort="defaultSort"
      :fit="true"
    >
      <slot name="expand">
        <!-- action definitions here -->
      </slot>

      <el-table-column
        v-if="showIndex"
        type="index"
        :index="indexMethod"
        label="No."
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
      justify="end"
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
        layout="total, sizes, prev, pager, next, jumper"
      />
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  props: {
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
    }
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
        pageSize: 20,
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

<style scoped></style>
