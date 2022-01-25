<template>
  <div class="header-info" :style="'margin-left:' + marginLeft + 'px'">
    <span style="margin-top:6px;">{{ title }}</span>
    <p>
      {{ newVal }}
      <slot name="subTitle"></slot>
    </p>
    <a-progress v-if="progress" :status="parseInt(value) > 80 ? 'exception' : 'normal'" :percent="parseInt(value)" :show-info="false"/>
    <em v-if="bordered" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useNumberEffect } from '../effect/useNumberEffect'

const newValEffect = (value, progress) => {
  const newVal = ref(undefined)
  const { val } = useNumberEffect(value)
  if (progress) {
    newVal.value = value
  } else {
    newVal.value = val
  }
  return { newVal }
}

export default {
  name: 'CardInfoProgress',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: '0'
    },
    bordered: {
      type: Boolean,
      default: false
    },
    marginLeft: {
      type: Number,
      default: 40
    },
    progress: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    const { newVal } = newValEffect(props.value, props.progress)
    return { newVal }
  }
}
</script>

<style lang="scss" scoped>
.header-info {
  position: relative;
  text-align: left;
  padding-right: 40px;
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
    height: 85px;
    background-color: #e8e8e8;
  }
}
</style>
