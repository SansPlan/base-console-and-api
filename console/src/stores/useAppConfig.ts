export interface AppConfigState {
  // 网站名称，在 logo 旁边那个
  siteName: string
  // 菜单栏伸缩态
  collapse: boolean
  // 菜单栏收起宽度
  menubarCollapseWidth: number
  // 菜单栏展开宽度
  menubarExpandWidth: number
  // naive-ui 默认伸缩按钮自定义样式
  menubarTriggerStyle: ObjectAny
  // 标签栏
  showTabBar: boolean
  // 当前标签下表
  currentTabIndex: number
  // 标签页列表
  tabBarItems: TabItem[]
}

// 标签页
export interface TabItem {
  label: string
  to: {
    name: string
  }
}

export interface AppConfigActions {
  // 当前路由是否为首页
  isHomePage: () => boolean
  // 菜单栏伸缩事件
  toggleCollapse: () => void
  // 追加标签页
  pushTabItem: (route: TabItem) => void
  // 移除标签页
  removeTabItem: (index: number) => void
  // 关闭某个标签页后面的所有标签
  removeRightTabItems: (index: number) => void
  // 关闭这个标签以外的所有标签
  removeOtherTabItems: (index: number) => void
  // 关闭所有标签
  removeAllTabItems: () => void
}

export type AppConfigProvider = AppConfigState & AppConfigActions

export const welcomeItem: TabItem = {
  label: '欢迎页',
  to: { name: 'oi.welcome' },
}

export const useAppConfig = defineStore<string, AppConfigState, ObjectAny, AppConfigActions>('appConfig', {
  state: () => ({
    siteName: 'LearnOnce',
    collapse: false,
    menubarCollapseWidth: 52,
    menubarExpandWidth: 230,
    menubarTriggerStyle: {
      top: '28px',
    },
    showTabBar: true,
    currentTabIndex: 0,
    tabBarItems: [welcomeItem],
  }),
  actions: {
    isHomePage() {
      const route = useRoute()
      return route.path === '/'
    },
    toggleCollapse() {
      this.collapse = !this.collapse
    },
    pushTabItem(route: TabItem) {
      const findIndex = this.tabBarItems.findIndex(item => item.to.name === route.to.name)
      if (findIndex === -1) {
        this.tabBarItems.push(route)
        this.currentTabIndex = this.tabBarItems.length - 1
      } else {
        this.currentTabIndex = findIndex
      }
    },
    removeTabItem(index: number) {
      this.tabBarItems.splice(index, 1)
      if (this.tabBarItems.length - 1 > index) {
        this.currentTabIndex += 1
      } else {
        this.currentTabIndex -= 1
      }
    },
    removeRightTabItems(index: number) {
      this.tabBarItems.splice(index, this.tabBarItems.length - index)
    },
    removeOtherTabItems(index: number) {
      const item = this.tabBarItems[index]
      this.tabBarItems = [welcomeItem, item]
      this.currentTabIndex = 1
    },
    removeAllTabItems() {
      this.tabBarItems = [welcomeItem]
      this.currentTabIndex = 0
    },
  },
})
