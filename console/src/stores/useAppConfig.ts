export type SystemThemeMode = 'light' | 'dark' | 'system'

export interface AppConfigState {
  // 本站主题
  themeMode: SystemThemeMode
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
  // 当前标签key
  currentTabKey: string | number
  // 标签页列表
  tabBarItems: TabItem[]
  // 标签页组件刷新
  refreshTabPage: boolean
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
  // 标签页刷新事件
  onRefreshTabPage: () => void
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
    themeMode: 'system',
    siteName: 'LearnOnce',
    collapse: false,
    menubarCollapseWidth: 52,
    menubarExpandWidth: 230,
    menubarTriggerStyle: {
      top: '28px',
    },
    showTabBar: true,
    currentTabKey: welcomeItem.to.name,
    tabBarItems: [welcomeItem],
    refreshTabPage: false,
  }),
  actions: {
    isHomePage() {
      const route = useRoute()
      return route.path === '/'
    },
    onRefreshTabPage() {
      this.refreshTabPage = true
      setTimeout(() => {
        this.refreshTabPage = false
      }, 100)
    },
    toggleCollapse() {
      this.collapse = !this.collapse
    },
    pushTabItem(route: TabItem) {
      const findItem = this.tabBarItems.find(item => item.to.name === route.to.name)
      if (!findItem) {
        this.tabBarItems.push(route)
        this.currentTabKey = this.tabBarItems[this.tabBarItems.length - 1].to.name
      } else {
        this.currentTabKey = findItem.to.name
      }
    },
    removeTabItem(index: number) {
      this.tabBarItems.splice(index, 1)
      if (this.tabBarItems.length === 1) {
        this.currentTabKey = welcomeItem.to.name
      } else {
        if (index > this.tabBarItems.length - 1) {
          this.currentTabKey = this.tabBarItems[this.tabBarItems.length - 1].to.name
        }
      }
    },
    removeRightTabItems(index: number) {
      const nextIndex = index + 1
      this.tabBarItems.splice(nextIndex, this.tabBarItems.length - nextIndex)
    },
    removeOtherTabItems(index: number) {
      const item = this.tabBarItems[index]
      this.tabBarItems = [welcomeItem, item]
      this.currentTabKey = item.to.name
    },
    removeAllTabItems() {
      this.tabBarItems = [welcomeItem]
      this.currentTabKey = welcomeItem.to.name
    },
  },
  persist: true,
})
