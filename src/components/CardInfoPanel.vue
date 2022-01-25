<script>
export default {
  props: {
    span: {
      type: Number,
      default: 6
    }
  },
  name: 'CardInfoPanel',
  data() {
    return {}
  },
  render() {
    const m = () => this.$slots.default().map(v => {
      return (
        <a-col span={ this.span }>
          { v }
        </a-col>
      )
    })
    return (
      <a-card bordered={false} style="margin-top: 20px;">
        <a-row>
          { m() }
        </a-row>
      </a-card>
    )
  }
}
</script>
