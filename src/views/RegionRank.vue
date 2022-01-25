<template>
  <div class="enterprise-rank-by-region">
    <a-table ref="pagedTable" rowKey="name" :columns="columns" :data-source="data" :pagination="pagination">
      <template #index="{record, text, index}">
        {{ (pagination.current - 1) * pagination.pageSize + Number(index) + 1 }}
      </template>
    </a-table>
  </div>
</template>
<script>
import numeral from 'numeral'
import { Table } from 'ant-design-vue'
import data from './table.json'
const numberPretty = (num) => numeral(num).format('0,0')

const columns = [
  {
    title: '排名',
    key: 'index',
    slots: { customRender: 'index' }
  },
  {
    title: '地域名称',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true
  },
  {
    title: '企业数量',
    dataIndex: 'value',
    key: 'value',
    customRender: (text, record, index) => numberPretty(text)
  },
  {
    title: '名称',
    dataIndex: 'online_count',
    key: 'online_count',
    customRender: (text, record, index) => numberPretty(text)
  },
  {
    title: '上云企业',
    dataIndex: 'cloud_count',
    key: 'cloud_count',
    customRender: (text, record, index) => numberPretty(text)
  },
  {
    title: '重保企业',
    dataIndex: 'protect_count',
    key: 'protect_count',
    customRender: (text, record, index) => numberPretty(text)
  }
]

export default {
  name: 'RegionRank',
  components: { ATable: Table },
  mounted() {
    this.getEnterpriseListByRegion()
  },
  props: {
    regionId: Number,
    regionName: String
  },
  watch: {
    regionId: function (val, oldVal) {
      this.getEnterpriseListByRegion()
    }
  },
  data() {
    return {
      columns,
      data: [],
      pagination: {
        pageSize: 5,
        current: 1,
        total: 0,
        onChange: this.onPageChange
      }
    }
  },
  computed: {
    params() {
      const { pageSize, current } = this.pagination
      return {
        page: current,
        limit: pageSize
      }
    }
  },
  methods: {
    getEnterpriseListByRegion() {
      this.data = data.data.list
    },
    onPageChange(page) {
    }
  }
}
</script>
<style lang="scss">
.enterprise-rank-by-region {
  .ant-table {
    line-height: 1.2;
    height: 310px;
  }
}
</style>
