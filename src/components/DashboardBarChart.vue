<template>
  <div class="barBox" :style="{ height: height, width: width }">
    <div v-if="show" :id="id" :style="{ height: height, width: width }"></div>
    <empty-result v-else text="暂无数据" abs></empty-result>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'DashboardBarChart',
  data() {
    return {
      data: {
        title: [],
        datas: []
      },
      show: true
    }
  },
  props: {
    id: {
      type: String,
      required: true,
      default: 'chart'
    },
    height: {
      type: String,
      default: '348px'
    },
    width: {
      type: String
    },
    name: String,
    toolTitle: {
      type: String,
      default: '设备数量'
    },
    unit: {
      type: String,
      default: '个'
    },
    type: {
      type: String,
      default: '1'
    }
  },
  mounted() {
    // this.draw(this.data)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    async draw(data) {
      if (data.datas.length === 0) {
        this.show = false
        return
      }
      this.show = true
      await Promise.resolve()
      const that = this
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
            shadowStyle: {
              color: 'rgba(0,0,0, 0.04)'
            }
          },
          extraCssText: 'box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);',
          backgroundColor: '#fff',
          padding: [10, 10, 10, 10],
          textStyle: {
            color: 'rgba(0,0,0,0.45)',
            fontSize: 12
          },
          formatter: function (v) {
            var tooltipHtml = `<div style="line-height: 24px;">
            <span">${v[0].name}</span>
            <div style="color: #000">
              <p style="margin: 0;padding:0">${that.toolTitle}  ${v[0].value}${that.unit}</p>
            </div>
            </div>`
            return tooltipHtml
          }
        },
        legend: {
          icon: 'rect',
          itemWidth: 12,
          itemHeight: 12,
          left: 0,
          top: 0,
          selectedMode: false,
          textStyle: {
            color: 'rgba(0,0,0,0.45)',
            fontSize: 12,
            padding: [0, 8]
          }
        },
        grid: {
          left: 0,
          right: '24px',
          bottom: '16px',
          containLabel: true
        },
        xAxis: {
          type: that.type === '1' ? 'value' : 'category',
          data: data.title,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: 'rgba(0,0,0,.45)'
            }
          }
        },
        yAxis: {
          type: that.type === '1' ? 'category' : 'value',
          data: data.title,
          inverse: that.type === '1',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: 'rgba(0,0,0,.45)'
            },
            formatter: function (v) {
              var innerHtml = v.length > 8 ? v.substring(0, 8) + '...' : v
              return innerHtml
            }
          }
        },
        series: [
          {
            name: this.name,
            type: 'bar',
            barMaxWidth: 12,
            itemStyle: {
              normal: {
                color: '#2FC49A'
              },
              emphasis: {
                color: '#2FC49A',
                borderColor: '#000',
                borderWidth: 1
              }
            },
            data: data.datas
          }
        ]
      })
    }
  }
}
</script>
<style scoped lang="scss">
.barBox {
  position: relative;
  width: 100%;
}
</style>
