<template>
  <div class="home">
    <card-info-panel :span="6">
      <card-info title="设备数量(个)" :value="37622" :bordered="true" />
      <card-info title="协议数量(个)" :value="27" :bordered="true" />
      <card-info title="厂商数量(个)" :value="37127" :bordered="true" />
      <card-info title="设备详细型号(个)" :value="16" />
    </card-info-panel>
    <card-info-panel :span="6">
      <card-info-progress title="CPU使用率" value="40.25%" :bordered="true" :marginLeft="16" />
      <card-info-progress title="内存使用率" value="96.88%" :bordered="true" />
      <card-info-progress title="磁盘使用率" value="1.58%" :bordered="true">
        <template #subTitle>
          <span class="CardInfoProgress-subTitle">
            已用<em>97GB</em>/共<em>6TB</em>
          </span>
        </template>
      </card-info-progress>
      <card-info-progress title="日志量(个）" value="10000" :progress="false" />
    </card-info-panel>
    <dashboard-card>
      <dashboard-cell title="工业设备-地域分布">
        <p class="maptitle">
          <span style="color:#039972">滨海新区</span>
          工业设备数量：264 个
        </p>
        <dashboard-TJMap
          id="TJMap"
          ref="TJMap"
          toolTitle="工业设备数量"
          :mapData="mapData"
        />
      </dashboard-cell>
      <dashboard-cell title="工业企业-地域排名">
        <region-rank/>
      </dashboard-cell>
    </dashboard-card>
    <dashboard-card>
      <dashboard-cell title="设备接入商分布">
        <dashboard-barChart
          id="AssetDevice"
          ref="AssetDevice"
          name="设备数量(个)"
          toolTitle="设备数量"
          unit="个"
        />
      </dashboard-cell>
      <dashboard-cell title="设备接入商分布">
        <dashboard-pieChart
          id="Assetportal"
          ref="Assetportal"
          unit="%"
          :toolTitle="{extra:'', tooltip1: '设备占比', tooltip2: '设备数量'}"
          name="设备总数（个）"
        />
      </dashboard-cell>
    </dashboard-card>
  </div>
</template>

<script>
import { formatterBarData, formatTJData } from '../utils/mapUtil'
import TJData from '../api/TJ.json'
import RegionRank from './RegionRank'
import DashboardPieChart from '../components/DashboardPieChart'
import DashboardBarChart from '../components/DashboardBarChart'
import { echartsData1, echartsData2 } from '../api/apijson'

export default {
  name: 'Home',
  data() {
    return {
      mapData: [],
      subtext: '0',
      AssetportalData: [],
    }
  },
  async mounted() {
    this.mapData = formatTJData(TJData.data.list, TJData.data.stat.name)
    this.$refs.Assetportal.draw(echartsData1, this.subtext)
    this.$refs.AssetDevice.draw(echartsData2)
  },
  components: {
    RegionRank,
    DashboardPieChart,
    DashboardBarChart
  }
}
</script>

<style scoped lang="scss">
.home{
  width: 1480px;
  margin: 0 auto;
}
.CardInfoProgress-subTitle{
  font-size: 12px;
  color: rgba(0,0,0,0.45);
  em{
    font-style: normal;
    color: rgba(0,0,0,0.65);
    margin: 0 5px;
  }
}
</style>
