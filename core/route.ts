import type { AppInstance } from './app'

interface Route {
  (app: AppInstance): void
}

export const defineRoute = (fn: Route) => fn