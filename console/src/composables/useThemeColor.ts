/**
 * 基于 NaiveUI
 */
import { type Ref } from 'vue'
import { darkTheme, lightTheme, type GlobalThemeOverrides } from 'naive-ui'
import type { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import type { LoadingBarInst } from 'naive-ui/es/loading-bar/src/LoadingBarProvider'
import { useCloned, useDark, usePreferredDark } from '@vueuse/core'
import { colord } from 'colord'

export type SystemThemeMode = 'light' | 'dark' | 'system'

export interface ThemeColorProvider {
  // 主题模式
  themeMode: Ref<SystemThemeMode>
  // 主题覆盖
  themeOverrides: Ref<GlobalThemeOverrides>
  // 重置主题色
  syncThemeOverrides: () => void
  // naive 默认主题，根据当前主题模式返回
  theme: Ref<BuiltInGlobalTheme>
  // 预设主题色
  swatches: string[]
  // 当前主题模式是否为暗色
  isDark: Ref<boolean>
  // naive 加载条
  // 因为加载条要放在路由守卫，因此不被包含在 NLoadingBarProvider 组件中，而是需要通过 createDiscreteApi 生成
  loadingBar: LoadingBarInst
  // 设置主题色
  setThemeColor: (color: string) => void
}

export const themeModeStorageKey = 'LearnOnce-ThemeModeValue'
export const themeColorStorageKey = 'LearnOnce-ThemeColorValue'

const isPreferredDark = usePreferredDark()
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
})
const themeMode = ref<SystemThemeMode>('system')
watch(themeMode, (mode: SystemThemeMode) => {
  localStorage.setItem(themeModeStorageKey, mode)
  isDark.value = mode === 'system' ? isPreferredDark.value : mode === 'dark'
  theme.value = isDark.value ? darkTheme : lightTheme
})
const theme = ref<BuiltInGlobalTheme>(lightTheme)
watch(isPreferredDark, (dark: boolean) => {
  if (themeMode.value === 'system') {
    isDark.value = dark
    theme.value = dark ? darkTheme : lightTheme
  }
})

const storageMode = localStorage.getItem(themeModeStorageKey)
if (storageMode) {
  themeMode.value = storageMode as SystemThemeMode
}

// 预设覆盖主题
const { cloned: themeOverrides, sync } = useCloned<GlobalThemeOverrides & ObjectAny>({
  common: {
    primaryColor: '#2563eb',
    primaryColorHover: '#3b82f6',
    primaryColorPressed: '#1d4ed8',
    primaryColorSuppl: '#3b82f6',
    borderRadius: '4px',
  },
  Menu: {
    itemHeight: '36px',
  },
  Tooltip: {
    boxShadow: '0 3px 6px -4px rgba(0, 0, 0, .12), 0 0px 8px 0 rgba(0, 0, 0, .08), 0 5px 16px 4px rgba(0, 0, 0, .05)',
  },
  Popover: {
    fontSize: '13px',
    boxShadow: '0 3px 6px -4px rgba(0, 0, 0, .12), 0 0px 8px 0 rgba(0, 0, 0, .08), 0 5px 10px 4px rgba(0, 0, 0, .05)',
  },
})

function getLoadingBar(theme?: GlobalThemeOverrides) {
  return createDiscreteApi(['loadingBar'], {
    configProviderProps: {
      themeOverrides: theme || themeOverrides.value,
    },
  })
}
let { loadingBar } = getLoadingBar()

const swatches: string[] = [
  '#65a30d',
  '#16a34a',
  '#0d9488',
  '#0284c7',
  '#2563eb',
  '#4f46e5',
  '#c026d3',
  '#9333ea',
  '#4b5563',
  '#475569',
  '#ea580c',
  '#dc2626',
  '#db2777',
]

// 切换颜色后再深色模式不能够很好的兼容
// 后续加入 themeMode 判断并通过 colord 对当前颜色进行处理以便再暗色模式下，选取的颜色能够适配
// 颜色处理抽成函数，因为在 themeMode 切换到亮色的时候要对暗色选取的颜色进行加深
let colorSource: string
function formatColor() {
  let color = localStorage.getItem(themeColorStorageKey)
  let brightColor, darkenColor
  if (!color) {
    color = themeOverrides.value.common?.primaryColor as string
  }
  // dark 浅化颜色
  if (isDark.value) {
    color = colord(color).lighten(0.16).toHex()
    brightColor = colord(color).lighten(0.1).toHex()
    darkenColor = colord(color).lighten(0.125).toHex()
    colorSource = color
  }
  // light 加深颜色
  else {
    if (colorSource) {
      color = colord(colorSource).darken(0.16).toHex()
      brightColor = colord(colorSource).darken(0.2).toHex()
      darkenColor = colord(colorSource).darken(0.125).toHex()
      colorSource = ''
    } else {
      brightColor = colord(color).lighten(0.05).toHex()
      darkenColor = colord(color).darken(0.075).toHex()
    }
  }
  const colors: GlobalThemeOverrides['common'] = {
    primaryColor: color,
    primaryColorHover: brightColor,
    primaryColorSuppl: brightColor,
    primaryColorPressed: darkenColor,
  }
  themeOverrides.value.common = {
    ...themeOverrides.value.common,
    ...colors,
  }
}
watch(isDark, formatColor)

function setThemeColor(color: string) {
  localStorage.setItem(themeColorStorageKey, color)
  formatColor()
  ;({ loadingBar } = getLoadingBar(themeOverrides.value))
}

const cacheColor = localStorage.getItem(themeColorStorageKey)
if (cacheColor) setThemeColor(cacheColor)

function syncThemeOverrides() {
  sync()
  localStorage.removeItem(themeColorStorageKey)
}

// Q1: useThemeColor 代码中到底什么原因造成的 ref 绑定失效？
export const useThemeColor = (): ThemeColorProvider => {
  return {
    themeMode,
    themeOverrides,
    syncThemeOverrides,
    theme,
    isDark,
    swatches,
    loadingBar,
    setThemeColor,
  }
}
