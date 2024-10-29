<script setup lang="ts">
import { useThemeColor } from '@/composables/useThemeColor'
import * as echarts from 'echarts'
import data from './flare.json'

const renderRef = shallowRef<HTMLDivElement | null>(null)

function _render() {
  const chart = echarts.init(renderRef.value)

  data.children.forEach(function (datum, index) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    index % 2 === 0 && (datum.collapsed = true)
  })

  // chart.showLoading()
  // chart.hideLoading()
  chart.setOption({
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
    },
    series: [
      {
        type: 'tree',
        data: [data],
        top: '1%',
        left: '7%',
        bottom: '1%',
        right: '20%',
        symbolSize: 7,
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 9,
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left',
          },
        },
        emphasis: {
          focus: 'descendant',
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
      },
    ],
  })
}

onMounted(_render)
</script>

<template>
  <div ref="renderRef" class="w-full h-full" />
</template>
