import { request } from '../http'

// Fetch all route information
export function fetchAllRoutes() {
  console.error('fetch route')
  return request.Get<Service.ResponseResult<AppRoute.RowRoute[]>>('/getUserRoutes')
}

// Fetch all user information
export function fetchUserPage() {
  return request.Get<Service.ResponseResult<Entity.User[]>>('/userPage')
}

// Fetch all role lists
export function fetchRoleList() {
  return request.Get<Service.ResponseResult<Entity.Role[]>>('/role/list')
}

/**
 * Request to fetch dictionary list
 *
 * @param code - Dictionary code, used to filter specific dictionary lists
 * @returns The returned dictionary list data
 */
export function fetchDictList(code?: string) {
  const params = { code }
  return request.Get<Service.ResponseResult<Entity.Dict[]>>('/dict/list', { params })
}
