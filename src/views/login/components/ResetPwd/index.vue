<script setup lang="ts">
import type { FormInst } from 'naive-ui'

const emit = defineEmits(['update:modelValue'])
function toLogin() {
  emit('update:modelValue', 'login')
}
const { t } = useI18n()

const rules = computed(() => {
  return {
    account: {
      required: true,
      trigger: 'blur',
      message: t('login.resetPasswordRuleTip'),
    },
  }
})
const formValue = ref({
  account: '',
})
const formRef = ref<FormInst | null>(null)
function handleRegister() {
  formRef.value?.validate()
}
</script>

<template>
  <div>
    <NH2 depth="3" class="text-center">
      {{ $t('login.resetPasswordTitle') }}
    </NH2>
    <NForm
      ref="formRef"
      :rules="rules"
      :model="formValue"
      :show-label="false"
      size="large"
    >
      <NFormItem path="account">
        <NInput
          v-model:value="formValue.account"
          clearable
          :placeholder="$t('login.resetPasswordPlaceholder')"
        />
      </NFormItem>
      <NFormItem>
        <NSpace
          vertical
          :size="20"
          class="w-full"
        >
          <NButton
            block
            type="primary"
            @click="handleRegister"
          >
            {{ $t('login.resetPassword') }}
          </NButton>
          <NFlex justify="center">
            <NText>{{ $t('login.haveAccountText') }}</NText>
            <NButton
              text
              type="primary"
              @click="toLogin"
            >
              {{ $t('login.signIn') }}
            </NButton>
          </NFlex>
        </NSpace>
      </NFormItem>
    </NForm>
  </div>
</template>

<style scoped></style>
