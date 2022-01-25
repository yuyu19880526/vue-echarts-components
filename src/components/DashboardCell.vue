
<script>
export default {
  name: 'DashboardCell',
  props: {
    bodyStyle: {
      type: Object,
      default: () => {
        return { height: '450px' }
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  render() {
    return (
      <a-card
        bordered={false}
        headStyle={{ border: 0, margin: 0 }}
        bodyStyle={this.bodyStyle}
      >
        <h2 style="font-size: 16px; font-weight:bold; margin-bottom: 24px; padding-bottom: 0;line-height: 18px;">{this.title}</h2>
        {this.$slots.default().map((component) => component)}
      </a-card>
    )
  }
}
</script>
