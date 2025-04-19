declare namespace AppRoute {

  type MenuType = 'dir' | 'page'
  /** Meta information for a single route */
  interface RouteMeta {
    /* Page title, usually required. */
    title: string
    /* Icon, generally used with menus. */
    icon?: string
    /* Whether login permission is required. */
    requiresAuth?: boolean
    /* Roles that can access this route. */
    roles?: Entity.RoleType[]
    /* Whether to enable page caching. */
    keepAlive?: boolean
    /* Some routes should not be displayed in the menu, such as certain edit pages. */
    hide?: boolean
    /* Menu order. */
    order?: number
    /* Nested external link. */
    href?: string
    /** When the current route is not displayed in the left menu but needs to highlight a specific menu. */
    activeMenu?: string
    /** Whether the current route will be added to the Tab. */
    withoutTab?: boolean
    /** Whether the current route will be pinned in the Tab, used for some persistent pages. */
    pinTab?: boolean
    /** Whether the current route in the left menu is a directory or a page, defaults to 'page' if not set. */
    menuType?: MenuType
  }

  type MetaKeys = keyof RouteMeta

  interface baseRoute {
    /** Route name (unique identifier for the route). */
    name: string
    /** Route path. */
    path: string
    /** Route redirection. */
    redirect?: string
    /* Page component path. */
    componentPath?: string | null
    /* Route ID. */
    id: number
    /* Parent route ID, top-level pages are null. */
    pid: number | null
  }

  /** Type structure for a single route (dynamic route mode: backend returns routes in this structure). */
  type RowRoute = RouteMeta & baseRoute

  /**
   * Actual route structure mounted to the project.
   */
  interface Route extends baseRoute {
    /** Child routes. */
    children?: Route[]
    /* Page component. */
    component: any
    /** Route description. */
    meta: RouteMeta
  }

}
