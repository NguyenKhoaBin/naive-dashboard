import type { App } from 'vue'
import { local } from '@/utils'
import { createI18n } from 'vue-i18n'
import enUS from '../../locales/en_US.json'
import viVN from '../../locales/vi_VN.json'

const { VITE_DEFAULT_LANG } = import.meta.env

export const i18n = createI18n({
  legacy: false,
  locale: local.get('lang') || VITE_DEFAULT_LANG,
  fallbackLocale: VITE_DEFAULT_LANG,
  messages: {
    enUS,
    viVN,
  },
  fallbackWarn: false,
})

export function install(app: App) {
  app.use(i18n)
}
