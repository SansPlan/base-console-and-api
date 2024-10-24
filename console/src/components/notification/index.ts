export { default as NotificationList } from './List.vue'
export { default as NotificationDrawer } from './Drawer.vue'

export interface MessageItem {
  id: string | number
  title: string
  descript: string
  tag: string[]
  href: string
  content: string
}
