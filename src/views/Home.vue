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
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home{
  width: 1280px;
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
