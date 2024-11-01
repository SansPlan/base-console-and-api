<script setup lang="ts">
import { useToggle } from '@vueuse/core'

interface ModalProp {
  // 是否启用快捷键
  shortcut: boolean
}

const props = defineProps<ModalProp>()

const showModal = ref<boolean>(false)
const toggleModal = useToggle(showModal)

// 启用快捷键
watch(() => props.shortcut, listenSearchModalUseKeyboard)
onMounted(listenSearchModalUseKeyboard)

// 监听是否开启快捷键打开搜索框
function listenSearchModalUseKeyboard() {
  const { shortcut } = props

  const toggleShortcutModal = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === ' ') {
      showModal.value = true
    }
  }

  if (shortcut) {
    document.addEventListener('keydown', toggleShortcutModal)
  } else {
    document.removeEventListener('keydown', toggleShortcutModal)
  }
}

// 搜索内容
const searchValue = ref<string | null>(null)
</script>

<template>
  <div>
    <slot :toggleModal="toggleModal" />

    <n-modal v-model:show="showModal" transform-origin="center">
      <div class="bg-white dark:bg-zinc-800 border dark:border-zinc-700 w-[640px] max-w-full rounded-md flex flex-col">
        <div class="flex items-center gap-2 px-3 border-b dark:border-b-zinc-700">
          <Icon icon="prime:search" width="18" class="flex-shrink-0" />
          <input
            type="text"
            :aria-expanded="showModal"
            aria-disabled="false"
            autocomplete="false"
            placeholder="搜索点什么"
            class="flex w-full py-3 text-sm bg-transparent rounded-md outline-none h-11 placeholder:text-muted-400"
            v-model="searchValue"
          />
          <n-button quaternary circle @click="toggleModal()">
            <Icon icon="mi:close" width="18" />
          </n-button>
        </div>
        <n-scrollbar class="flex-grow md:max-h-[50vh]" content-class="p-2">
          <div class="px-8 py-12 text-zinc-500">
            <p>由于各项目搜索内容不一，搜索功能请自行实现。</p>
            <p>也曾想过做全站搜索，但一想这是用来开源的，并不是什么项目都需要搜索或全站搜索。</p>
            <br />
            <p>更重要的是，我不会全站搜索/(ㄒoㄒ)/~~</p>
          </div>
        </n-scrollbar>
      </div>
    </n-modal>
  </div>
</template>
