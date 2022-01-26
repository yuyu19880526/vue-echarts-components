<template>
  <div class="mapBox">
    <div :id="id" :class="className" :style="{height:height,width:width}" />
    <div class="rightBtn">
      <a-button class="decline" :disabled="deDis" icon="-" @click="decline" />
      <span>{{ defaultInt }}%</span>
      <a-button class="increase" :disabled="inDis" icon="+" @click="increase" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import TJgeo from '../assets/geo/tianjin.json'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String
    },
    height: {
      type: String,
      default: '330px'
    },
    mapData: {
      type: Array
    },
    toolTitle: {
      type: String
    }
  },
  data () {
    return {
      data: {},
      zoomBtn: [1, 2, 4, 6],
      zoomIndex: 0,
      labelHiddenArr: ['红桥区', '南开区', '河东区', '河西区', '河北区', '和平区'],
      chart: null,
      deDis: true,
      inDis: false,
      defaultInt: 100
    }
  },
  mounted () {
    this.draw(this.mapData)
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    zoomIndex() {
      this.deDis = this.zoomIndex === 0
      this.inDis = this.zoomIndex === (this.zoomBtn.length - 1)
    },
    mapData() {
      this.draw(this.mapData)
    }
  },
  computed: {
    zoomData() {
      return this.zoomBtn[this.zoomIndex]
    }
  },
  methods: {
    draw (data) {
      const that = this
      this.data = data
      this.chart && this.chart.dispose()
      this.chart = echarts.init(document.getElementById(this.id))
      echarts.registerMap('天津市', TJgeo, {})// 引入地图文件
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          show: true,
          showDelay: 0,
          transitionDuration: 0.2,
          backgroundColor: '#fff',
          borderColor: '#fff',
          extraCssText: 'box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);',
          textStyle: {
            color: 'rgba(0,0,0,0.85);',
            fontSize: 12,
            fontWeight: 'bold'
          },
          formatter: function (v) {
            var tooltipHtml = `<div style="line-height:28px;">
              <p style="color: rgba(0,0,0,0.45);margin:0;padding:0">${v.name}</p>
              <p style="margin:0;padding:0">${that.toolTitle}<em style="margin-left:24px;font-style:normal;">${v.value || 0}</em></p>
            </div>`
            return tooltipHtml
          }
        },
        series: [{
          type: 'map',
          top: 20,
          bottom: 10,
          left: 'center',
          roam: 'move',
          map: '天津市',
          zoom: this.zoomData,
          label: {
            show: true,
            formatter: function (params) {
              if (that.labelHiddenArr.includes(params.name) && (that.zoomData === 1 || that.zoomData === 2)) {
                return ''
              } else {
                return params.name
              }
            },
            fontSize: 12,
            fontWeight: 'bold',
            color: '#000'
          },
          itemStyle: {
            areaColor: '#D9F4EE',
            borderColor: '#595959',
            borderWidth: 0.5
          },
          emphasis: {
            itemStyle: {
              areaColor: '#71edc2',
              borderColor: '#000',
              borderWidth: 0.5
            },
            label: {
              show: true,
              color: '#000'
            }
          },
          select: {
            itemStyle: {
              areaColor: '#2fc49a',
              borderColor: '#000000',
              borderWidth: 0.5
            },
            label: {
              color: '#fff'
            }
          },
          data: that.mapData
        }]
      })
    },
    decline () {
      this.zoomIndex--
      this.defaultInt = this.zoomBtn[this.zoomIndex] * 100
      this.draw(this.data)
    },
    increase () {
      this.zoomIndex++
      this.defaultInt = this.zoomBtn[this.zoomIndex] * 100
      this.draw(this.data)
    }
  }
}
</script>
<style lang="scss">
.mapBox{
  position: relative;
  background: rgba(0,0,0,0.04);
  .rightBtn{
    position: absolute;
    right: 12px;
    bottom: 12px;
    span{
      display: inline-block;
      width: 60px;
      background: #fff;
      text-align: center;
      border-top: 1px solid #d9d9d9;
      line-height: 24px;
      height: 26px;
      border-bottom: 1px solid #d9d9d9;
    }
    .decline,.increase{
      width: 26px;
      height: 26px;
    }
  }
}
</style>
