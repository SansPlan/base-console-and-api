<script setup lang="ts">
import type { FormRules } from 'naive-ui'
import { useAppConfig } from '@/stores/useAppConfig'
import { useAuthorize } from '@/stores/useAuthorize'
import { SLogo } from '@/components/uninportance'

// 表单字段
interface LoginForm {
  username: string
  password: string
  captcha: string
}

const router = useRouter()
const { withLogout, setToken } = useAuthorize()
const { removeAllTabItems } = useAppConfig()

onMounted(() => {
  withLogout(router)
  removeAllTabItems()
})

// 定义 表单组件 ref
// 定义 表单
// 定义 表单验证规则
const formRef = shallowRef<HTMLFormElement | null>(null)
const formFields = reactive<LoginForm>({
  username: '',
  password: '',
  captcha: '',
})
const formRules: FormRules = {
  // 用户名规则验证
  // 这里做了异步验证
  // 如果用户账号不存在，没必要再到登录接口再做验证
  username: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('请输入账号')
      }
      return new Promise<void>((resolve, _reject) => {
        setTimeout(() => resolve(), 1500)
      })
    },
    trigger: 'blur',
  },
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度在 6~18 位', trigger: 'blur' },
  ],
  captcha: { required: true, message: '请根据右侧图像输入验证码', trigger: 'blur' },
}

// 一键验证
// 验证通过发起登录请求
// 处理登录成功：
// - 登录态持久化
// - 账户信息获取
// - 角色权限获取
const loading = ref<boolean>(false)
function handleSubmit() {
  loading.value = true
  formRef.value?.validate(async (error: any) => {
    if (!error) {
      // 验证通过
      setToken('test')
      router.push('/').then(() => (loading.value = false))
    } else {
      loading.value = false
    }
  })
}
</script>

<template>
  <main class="flex flex-col min-h-screen">
    <header>
      <div class="container flex items-center h-16 px-5 mx-auto">
        <SLogo :size="24" class="inline" />
        <span class="inline-block ml-2 text-lg font-semibold align-middle">控制台</span>
      </div>
    </header>
    <section class="flex-grow shadow-inner block-line-background">
      <div class="container px-5 mx-auto">
        <div class="p-8 mx-auto my-16 bg-white shadow-xl max-w-[358px] rounded-xl">
          <div class="mb-8 space-y-2 text-center">
            <h3 class="space-x-1">
              <span class="inline text-xl align-middle">欢迎回来</span>
              <Icon icon="mdi:applause" class="inline text-orange-500" width="20" />
            </h3>
            <p class="text-sm text-zinc-500">今天你的心情怎么样呢？要保持开心哦</p>
          </div>
          <n-divider />
          <n-form ref="formRef" :model="formFields" :rules="formRules">
            <n-form-item label="账号" path="username">
              <n-input v-model:value="formFields.username" />
            </n-form-item>
            <n-form-item label="密码" path="password">
              <n-input v-model:value="formFields.password" type="password" />
            </n-form-item>
            <n-form-item label="图片验证" path="captcha">
              <n-input-group>
                <n-input v-model:value="formFields.captcha" placeholder="右侧图像结果">
                  <template #suffix>
                    <div class="w-16 -mr-2 h-7 bg-zinc-100" />
                  </template>
                </n-input>
                <n-input-group-label>
                  <Icon icon="eva:refresh-fill" class="inline -mt-1" />
                </n-input-group-label>
              </n-input-group>
            </n-form-item>
            <div class="flex items-center mb-6">
              <n-checkbox>记住我</n-checkbox>
            </div>
            <n-button block type="primary" :loading="loading" @click="handleSubmit">登录</n-button>
          </n-form>
        </div>
      </div>
    </section>
    <footer class="py-6 space-y-2 text-xs text-center text-zinc-600">
      <div>Copyright &copy;2024 {Oi, Web} All Rights Reserved.</div>
      <div>粤备xxxxxxxx-1 <n-divider vertical /> 粤网安 xxxxxxx</div>
    </footer>
  </main>
</template>

<style lang="scss" scoped>
.block-line-background {
  background-size: 53px 53px;
  background-image: linear-gradient(to right, #d4d4d8 1px, transparent 1px), linear-gradient(to bottom, #d4d4d8 1px, transparent 1px);
}
</style>
