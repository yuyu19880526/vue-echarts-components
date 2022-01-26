<template>
  <div class="lineBox" :style="{height:height,width:width}">
    <div v-if="show" :id="id" :style="{height:height,width:width}"></div>
    <!-- <empty-result v-else text="暂无数据" abs></empty-result> -->
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'DashboardLineChart',
  data() {
    return {
      data: {
        title: [],
        datas: []
      },
      option: {},
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
      default: '356px'
    },
    width: {
      type: String
    },
    name: String,
    toolTitle: String,
    unit: {
      type: String,
      default: '个'
    }
  },
  mounted() {
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
      const that = this
      if (data.datas.length === 0) {
        this.show = false
        return
      }
      this.show = true
      await Promise.resolve()
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          },
          extraCssText: 'box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);',
          backgroundColor: '#fff',
          padding: [10, 10, 10, 10],
          textStyle: {
            color: 'rgba(0,0,0,0.45)',
            fontSize: 12
          },
          formatter: function(v) {
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
          right: '7px',
          bottom: '24px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.title,
          axisLine: {
           show: false
          },
          axisTick: {
            show: true,
            lineStyle: {
               color: 'rgba(0,0,0,.45)'
            }
          },
          axisLabel: {
            fontSize: 12,
            color: 'rgba(0,0,0,.45)'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
           show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 12,
            color: 'rgba(0,0,0,.45)',
            formatter: function(val) {
              return val + that.unit
            }
          }
        },
        series: [
          {
            name: this.name,
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbolSize: 1,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#2FC49A'
                },
                {
                  offset: 1,
                  color: 'rgba(255,255,255,0)'
                }
              ])
            },
            itemStyle: {
              color: '#2FC49A',
            },
            emphasis: {
              itemStyle: {
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
.lineBox{
  position: relative;
  width: 100%;
}
</style>
