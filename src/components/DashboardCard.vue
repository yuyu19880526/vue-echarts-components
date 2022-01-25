<script>
export default {
  name: 'DashboardCard',
  render() {
    const t = () => this.$slots.default().map(v => {
      return (
        <a-col xl={12} lg={24} md={24} sm={24} xs={24}>
          { v }
        </a-col>
      )
    })
    return (
      <div style="margin-top: 24px">
        <a-row gutter={24} type="flex">
          { t() }
        </a-row>
      </div>
    )
  }
}
</script>
