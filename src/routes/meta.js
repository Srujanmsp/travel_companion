export const ROUTE_META = {
  "/start-planning": { navbar: "alt", footer: true },
  "/register": { navbar: "alt", footer: true },
  "/login": { navbar: "login", footer: true },
  "/planning": { navbar: "plan", footer: false },
  default: { navbar: "main", footer: true },
};

export function getRouteMeta(pathname) {
  return ROUTE_META[pathname] || ROUTE_META.default;
}
