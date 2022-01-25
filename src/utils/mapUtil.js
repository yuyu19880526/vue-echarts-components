export const formatTJData = (arr, name, labelColor = '#fff', areaColor = '#2fc49a', borderColor = '#000000', borderWidth = 0.5) => {
  if (!Array.isArray(arr)) return false
  return arr.map(item => {
    if (item.name === name || name === '天津市') {
      const obj = {}
      obj.name = item.name
      obj.value = item.value
      obj.selected = true
      obj.label = {
        emphasis: {
          color: labelColor
        }
      }
      obj.emphasis = {
        itemStyle: {
          areaColor: areaColor,
          borderColor: borderColor,
          borderWidth: borderWidth
        }
      }
      return obj
    } else {
      return ({
        name: item.name,
        value: item.value
      })
    }
  })
}

export const formatterBarData = (arr) => {
  if (!Array.isArray(arr)) return false
  if (arr.length === 0) return { title: [], datas: [] }
  const obj = {}
  obj.title = arr.map(item => item.name)
  obj.datas = arr.map(item => item.value)
  return obj
}
