import { NDataTable, type DataTableColumns } from 'naive-ui'

export const tableProps = {
  ...NDataTable.props,
  // 是否启用栏目设置
  columnSetting: {
    type: Boolean,
    default: false,
  },

  // Naive NDataTable 的类
  tableClass: {
    type: String,
    default: '',
  },
}

export interface TableColumnProps {
  columns: DataTableColumns
}
