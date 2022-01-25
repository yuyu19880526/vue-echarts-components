<template>
  <div class="home">
    <CardInfoPanel :span="6">
      <CardInfo title="设备数量(个)" :value="37622" :bordered="true" />
      <CardInfo title="协议数量(个)" :value="27" :bordered="true" />
      <CardInfo title="厂商数量(个)" :value="37127" :bordered="true" />
      <CardInfo title="设备详细型号(个)" :value="16" />
    </CardInfoPanel>
  </div>
</template>

<script>
import CardInfo from '../components/CardInfo.vue'
import CardInfoPanel from '../components/CardInfoPanel.vue'

export default {
  name: 'Home',
  components: {
    CardInfo,
    CardInfoPanel
  }
}
</script>

<style scoped lang="scss">
.home{
  width: 1280px;
  margin: 0 auto;
}
</style>
