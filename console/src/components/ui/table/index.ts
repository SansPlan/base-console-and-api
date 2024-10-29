import { NDataTable } from 'naive-ui'

export { default as LTableColumns } from './Columns.vue'
export { default as LTable } from './Table.vue'

export const LTableProps = {
  // 继承 NDataTable 原有 props
  ...NDataTable.props,

  // 是否启用栏目设置
  columnSetting: {
    type: Boolean,
    default: false,
  },
}
