<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { useAuthStore } from '@/store'
import { local } from '@/utils'

const emit = defineEmits(['update:modelValue'])

const authStore = useAuthStore()

function toOtherForm(type: any) {
  emit('update:modelValue', type)
}

const { t } = useI18n()
const rules = computed(() => {
  return {
    account: {
      required: true,
      trigger: 'blur',
      message: t('login.accountRuleTip'),
    },
    pwd: {
      required: true,
      trigger: 'blur',
      message: t('login.passwordRuleTip'),
    },
  }
})
const formValue = ref({
  account: 'super',
  pwd: '123456',
})
const isRemember = ref(false)
const isLoading = ref(false)

const formRef = ref<FormInst | null>(null)
function handleLogin() {
  formRef.value?.validate(async (errors) => {
    if (errors)
      return

    isLoading.value = true
    const { account, pwd } = formValue.value

    if (isRemember.value)
      local.set('loginAccount', { account, pwd })
    else local.remove('loginAccount')

    await authStore.login(account, pwd)
    isLoading.value = false
  })
}
onMounted(() => {
  checkUserAccount()
})
function checkUserAccount() {
  const loginAccount = local.get('loginAccount')
  if (!loginAccount)
    return

  formValue.value = loginAccount
  isRemember.value = true
}

function handleFacebookLogin() {
  console.log('Login with Facebook')
}

function handleGithubLogin() {
  console.log('Login with GitHub')
}
</script>

<template>
  <div>
    <NH2 depth="3" class="text-center">
      {{ $t('login.signInTitle') }}
    </NH2>
    <NForm ref="formRef" :rules="rules" :model="formValue" :show-label="false" size="large">
      <NFormItem path="account">
        <NInput v-model:value="formValue.account" clearable :placeholder="$t('login.accountPlaceholder')" />
      </NFormItem>
      <NFormItem path="pwd">
        <NInput v-model:value="formValue.pwd" type="password" :placeholder="$t('login.passwordPlaceholder')" show-password-on="click">
          <template #password-invisible-icon>
            <IconParkOutlinePreviewCloseOne />
          </template>
          <template #password-visible-icon>
            <IconParkOutlinePreviewOpen />
          </template>
        </NInput>
      </NFormItem>
      <NSpace vertical :size="20">
        <div class="flex-y-center justify-between">
          <NCheckbox v-model:checked="isRemember">
            {{ $t('login.rememberMe') }}
          </NCheckbox>
          <NButton type="primary" text @click="toOtherForm('resetPwd')">
            {{ $t('login.forgotPassword') }}
          </NButton>
        </div>
        <NButton block type="primary" size="large" :loading="isLoading" :disabled="isLoading" @click="handleLogin">
          {{ $t('login.signIn') }}
        </NButton>
        <NFlex>
          <NText>{{ $t('login.noAccountText') }}</NText>
          <NButton type="primary" text @click="toOtherForm('register')">
            {{ $t('login.signUp') }}
          </NButton>
        </NFlex>
      </NSpace>
    </NForm>
    <NDivider>
      <span op-80>{{ $t('login.or') }}</span>
    </NDivider>
    <NSpace justify="center">
      <NButton circle @click="handleFacebookLogin">
        <template #icon>
          <NIcon><IconParkOutlineFacebook /></NIcon>
        </template>
      </NButton>
      <NButton circle @click="handleGithubLogin">
        <template #icon>
          <NIcon><IconParkOutlineGithubOne /></NIcon>
        </template>
      </NButton>
    </NSpace>
  </div>
</template>

<style scoped></style>
