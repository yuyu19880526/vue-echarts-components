<template>
  <div class="header-info">
    <p>
      {{ value }}
    </p>
    <span style="margin-top:6px;">{{ title }}</span>
    <em v-if="bordered" />
  </div>
</template>

<script>
export default {
  name: 'CardInfo',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    bordered: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.header-info {
  position: relative;
  text-align: center;
  & > span {
    display: inline-block;
    margin-bottom: 4px;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
  }
  & > p {
    margin: 0;
    color: rgba(0,0,0,.85);
    font-size: 30px;
    line-height: 32px;
  }
  & > em {
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 56px;
    background-color: #e8e8e8;
  }
}
</style>


