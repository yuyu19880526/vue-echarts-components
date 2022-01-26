<template>
  <div class="pieBox" :style="{height:height,width:width}">
    <div v-if="show" :id="id" :style="{height:height,width:width}"></div>
    <!-- <empty-result v-else text="暂无数据" abs></empty-result> -->
  </div>
</template>
<script>
import * as echarts from 'echarts'
import numeral from 'numeral'
export default {
  name: 'DashboardPieChart',
  data() {
    return {
      chart: null,
      dataIndex: null,
      data: [],
      show: true,
      subText: ''
    }
  },
  components: {
  },
  props: {
    // data: Array,
    id: {
      type: String,
      required: true,
      default: 'chart'
    },
    height: {
      type: String,
      default: '328px'
    },
    width: {
      type: String
    },
    pieColor: {
      type: Array,
      default: function() {
        return ['#2FC49A ', '#5B8FF9 ', '#5D7092', '#F6BD16', '#E86452', '#6DC8EC', '#945FB9', '#FF9845', '#1E9493', '#FF99C3']
      }
    },
    selectedMode: {
      default: false
    }, // 是否支持点击选择，单选singl,默认不支持false 目前仅支持单选
    selectData: Object,
    name: String,
    unit: {
      type: String,
      default: ''
    },
    toolTitle: Object
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
  // watch: {
  //   data(val) {
  //     this.$nextTick(() => {
  //       this.draw(val, this.subtext)
  //     })
  //   }
  // },
  methods: {
    async draw(data, subText) {
      const numberPretty = (num) => numeral(num).format('0,0')
      const that = this
      if (data.length === 0) {
        this.show = false
        return
      }
      this.show = true
      await Promise.resolve()
      this.subText = numberPretty(subText)
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.on('click', function(v) {
        if (!that.selectedMode) return
        this.dataIndex = v.dataIndex
        that.$emit('click', { ...v.data, dataIndex: v.dataIndex })
      })
      this.chart.setOption({
        title: {
          text: this.name, // 主标题文本
          subtext: subText, // 副标题文本
          left: 'center',
          top: '136px',
          textStyle: {
            fontSize: 12,
            color: '#000',
            align: 'center',
            fontWeight: 'normal'
          },
          subtextStyle: {
            fontFamily: '微软雅黑',
            fontSize: 24,
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: '#fff',
          padding: [10, 10, 10, 10],
          borderColor: '#fff',
          extraCssText: 'box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);',
          textStyle: {
            color: 'rgba(0,0,0,0.45)',
            fontSize: 12
          },
          formatter: function(v) {
            var tooltipHtml = `<div style="line-height: 24px;">
            <span>
              <em style="display:inline-block;margin-right:5px;margin-bottom:2px;border-radius:10px;width:9px;height:9px;background:${v.color}"></em>
              <span style="margin-left: 8px;">${v.name}${that.toolTitle.extra || ''}</span>
            </span>
            <div style="color: rgba(0, 0, 0, 0.85)">
              <p style="margin: 0;padding:0">${that.toolTitle.tooltip1 || ''}：${v.percent}%</p>
              <p style="margin: 0;padding:0">${that.toolTitle.tooltip2 || ''}：${v.value}个</p>
            </div>
            </div>`
            return tooltipHtml
          }
        },
        legend: {
          icon: 'circle',
          itemWidth: 8,
          orient: 'vertical',
          right: 0,
          top: 'center',
          textStyle: {
            color: 'rgba(0,0,0,0.45)',
            fontSize: 12,
            padding: [0, 8]
          },
          formatter: function(v) {
            var innerHtml = v.length > 8 ? v.substring(0, 8) + '...' : v
            return innerHtml
          },
          tooltip: {
            show: true
          }
        },
        series:
        [
          {
            name: '',
            type: 'pie',
            radius: ['45%', '70%'],
            top: 0,
            avoidLabelOverlap: true,
            selectedMode: this.selectedMode,
            minAngle: this.selectedMode ? 13 : 0,
            label: {
              position: 'outer',
              alignTo: 'labelLine',
              bleedMargin: 0,
              formatter: this.selectedMode ? '{per|{d}%' + '(' + '{c}' + ')}\n' : '{per|{d}%' + '(' + '{c}' + ')}',
              rich: {
                per: {
                  color: 'rgba(0,0,0, .65)',
                  padding: [3, 4],
                  borderRadius: 4,
                  fontSize: 12
                }
              }
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(0,0,0,0.45)'
              }
            },
            emphasis: {
              scale: false,
              itemStyle: {
                borderColor: '#000',
                borderWidth: 1
              }
            },
            color: this.pieColor,
            data: data
          }
        ]
      })
    }
  }
}
</script>
<style scoped lang="scss">
.pieBox{
  position: relative;
  width: 100%;
}
</style>
