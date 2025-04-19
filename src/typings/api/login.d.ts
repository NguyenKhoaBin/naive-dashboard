/// <reference path="../global.d.ts"/>

namespace Api {
  namespace Login {
    /* User fields returned after login. This data is extended based on the user table,
       and some fields may need to be overridden, such as id */
    interface Info extends Entity.User {
      /** User ID */
      id: number
      /** User role types */
      role: Entity.RoleType[]
      /** Access token */
      accessToken: string
      /** Refresh token */
      refreshToken: string
    }
  }
}
