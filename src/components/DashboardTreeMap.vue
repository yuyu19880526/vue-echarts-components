<template>
  <div class="tree-map-container" :style="{ height: height, width: width }">
    <div v-if="data.length" :id="id" :class="className" :style="{ height: height, width: width }" />
    <!-- <empty-result v-else text="暂无数据" abs></empty-result> -->
  </div>
</template>

<script>
import { DataView } from '@antv/data-set'
import { Chart } from '@antv/g2'

export default {
  props: {
    className: {
      type: String,
      default: 'tree-map-chart'
    },
    id: {
      type: String,
      default: 'tree-map-chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '330px'
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.draw()
      })
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.draw()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.destroy()
    this.chart = null
  },
  methods: {
    draw() {
      if (!this.data.length) return
      if (this.chart) this.chart.destroy()
      const dv = new DataView()
      dv.source(
        {
          name: 'root',
          children: this.data
        },
        {
          type: 'hierarchy'
        }
      ).transform({
        field: 'value',
        type: 'hierarchy.treemap',
        tile: 'treemapResquarify',
        as: ['x', 'y']
      })

      // 将 DataSet 处理后的结果转换为 G2 接受的数据
      const nodes = dv
        .getAllNodes()
        .filter(({ data: { name } }) => name !== 'root')
        .map(({ data: { name, value }, x, y }) => ({ name, x, y, value }))
      const sum = nodes.map(({ value }) => value).reduce((x, y) => x + y, 0)

      this.chart = new Chart({
        container: this.id,
        autoFit: true
      })
      this.chart.data(nodes.map((item) => ({ ...item, percent: item.value / sum })))
      this.chart.scale({
        x: {
          nice: true
        },
        y: {
          nice: true
        }
      })

      this.chart.axis(false)
      this.chart.legend({
        position: 'top-left',
        flipPage: true,
        maxRow: 1,
        itemHeight: 15
      })
      this.chart.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl: `<li class="g2-tooltip-list-item">
<span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}
  <ul class="sub-list">
    <li><span>威胁类型占比:</span <span">{percent}</span></li>
    <li><span>安全事件数量:</span <span">{value}</span></li>
  </ul>
</li>`
      })
      this.chart
        .polygon()
        .position('x*y')
        .color('name')
        .tooltip('percent*name*value', (percent, name, value) => {
          return {
            percent: `${Number(percent * 100).toFixed(2)}%`,
            name,
            value: `${value}个`
          }
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })
        .label('name', {
          offset: 0,
          style: {
            textBaseline: 'middle'
          },
          layout: {
            type: 'limit-in-shape'
          }
        })
      this.chart.interaction('element-active')

      this.chart.render()
    }
  }
}
</script>
<style lang="scss" >
.tree-map-container {
  .g2-tooltip-list-item {
    .sub-list {
      width: 180px;
      margin: 8px 0;
      padding: 0;
      font-size: 14px;
      font-weight: 600;
      li {
        height: 18px;
        line-height: 16px;
        display: flex;
        justify-content: space-between;
        margin: 2px 0;
      }
    }
  }
}
</style>
