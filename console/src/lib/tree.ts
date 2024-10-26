// 列表 -> 树
// 要求支持自定义转化
export function convertListToTree(list: any[], parentName: string = 'LearnMainView'): any[] {
  return list
    .filter(item => item.parentName === parentName)
    .map(item => ({
      ...item,
      children: convertListToTree(list, item.name),
    }))
}

// 树 -> 列表
// 树还原成列表
// 如果是自定义转化，要求传入自定义转换字段
export function restoreTreeToList() {}
