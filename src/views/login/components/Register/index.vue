<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
function toLogin() {
  emit('update:modelValue', 'login')
}
const { t } = useI18n()

const rules = {
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
  rePwd: {
    required: true,
    trigger: 'blur',
    message: t('login.checkPasswordRuleTip'),
  },
}
const formValue = ref({
  account: 'admin',
  pwd: '000000',
  rePwd: '000000',
})

const isRead = ref(false)

function handleRegister() {}
</script>

<template>
  <div>
    <NH2 depth="3" class="text-center">
      {{ $t('login.registerTitle') }}
    </NH2>
    <NForm
      :rules="rules"
      :model="formValue"
      :show-label="false"
      size="large"
    >
      <NFormItem path="account">
        <NInput
          v-model:value="formValue.account"
          clearable
          :placeholder="$t('login.accountPlaceholder')"
        />
      </NFormItem>
      <NFormItem path="pwd">
        <NInput
          v-model:value="formValue.pwd"
          type="password"
          :placeholder="$t('login.passwordPlaceholder')"
          clearable
          show-password-on="click"
        >
          <template #password-invisible-icon>
            <IconParkOutlinePreviewCloseOne />
          </template>
          <template #password-visible-icon>
            <IconParkOutlinePreviewOpen />
          </template>
        </NInput>
      </NFormItem>
      <NFormItem path="rePwd">
        <NInput
          v-model:value="formValue.rePwd"
          type="password"
          :placeholder="$t('login.checkPasswordPlaceholder')"
          clearable
          show-password-on="click"
        >
          <template #password-invisible-icon>
            <IconParkOutlinePreviewCloseOne />
          </template>
          <template #password-visible-icon>
            <IconParkOutlinePreviewOpen />
          </template>
        </NInput>
      </NFormItem>
      <NFormItem>
        <NSpace
          vertical
          :size="20"
          class="w-full"
        >
          <NCheckbox v-model:checked="isRead">
            {{ $t('login.readAndAgree') }} <NButton
              type="primary"
              text
            >
              {{ $t('login.userAgreement') }}
            </NButton>
          </NCheckbox>
          <NButton
            block
            type="primary"
            @click="handleRegister"
          >
            {{ $t('login.signUp') }}
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
