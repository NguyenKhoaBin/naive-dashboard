/* Store database entity table types, specific content in ./entities */
declare namespace Entity {
}

/* Data types returned by various interfaces, specific content in ./api */
declare namespace Api {

}

interface Window {
  $loadingBar: import('naive-ui').LoadingBarApi
  $dialog: import('naive-ui').DialogApi
  $message: import('naive-ui').MessageApi
  $notification: import('naive-ui').NotificationApi
}

declare const AMap: any
declare const BMap: any

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}

declare namespace NaiveUI {
  type ThemeColor = 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning'
}

// Fix the slots type of the TabPane component in naive-ui https://github.com/tusen-ai/naive-ui/issues/6779,
// but directly doing this will cause more type errors and make it impossible to view the naive-ui source code
// declare module 'naive-ui' {
//   interface TabPaneSlots {
//     tab?: () => VNode[]
//   }
// }
declare namespace Storage {
  interface Session {
    dict: DictMap
  }

  interface Local {
    /* Store user information */
    userInfo: Api.Login.Info
    /* Store access token */
    accessToken: string
    /* Store refresh token */
    refreshToken: string
    /* Store login account */
    loginAccount: any
    /* Store current language */
    lang: App.lang
  }
}

declare namespace App {
  type lang = 'zhCN' | 'enUS'
}

interface DictMap {
  [key: string]: Entity.Dict[]
}
