// 列表 -> 树
// 要求支持自定义转化
export function convertListToTree(list: any[], parentName: string = 'IeMainView'): any[] {
  return list
    .filter(item => item.parentName === parentName)
    .map(item => {
      const childrenList = convertListToTree(list, item.name)
      return childrenList.length > 0
        ? {
            ...item,
            children: childrenList,
          }
        : item
    })
}

// 树 -> 列表
// 树还原成列表
// 如果是自定义转化，要求传入自定义转换字段
export function restoreTreeToList() {}
