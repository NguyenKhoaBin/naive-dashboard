/** Types related to requests */
declare namespace Service {
  import type { Method } from 'alova'

  interface AlovaConfig {
    baseURL: string
    timeout?: number
    beforeRequest?: (method: Method<globalThis.Ref<unknown>>) => void
  }

  /** Configuration for the data structure returned by the backend API */
  interface BackendConfig {
    /** Field representing the status code of the backend request */
    codeKey?: string
    /** Field representing the data of the backend request */
    dataKey?: string
    /** Field representing the message of the backend request */
    msgKey?: string
    /** Status defined by the backend for a successful request */
    successCode?: number | string
  }

  type RequestErrorType = 'Response Error' | 'Business Error' | null
  type RequestCode = string | number

  interface RequestError {
    /** Type of error in the request service */
    errorType: RequestErrorType
    /** Error code */
    code: RequestCode
    /** Error message */
    message: string
    /** Returned data */
    data?: any
  }

  interface ResponseResult<T> extends RequestError {
    /** Whether the request service was successful */
    isSuccess: boolean
    /** Type of error in the request service */
    errorType: RequestErrorType
    /** Error code */
    code: RequestCode
    /** Error message */
    message: string
    /** Returned data */
    data: T
  }
}
