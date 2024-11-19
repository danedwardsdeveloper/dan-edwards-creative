export const apiRoutes = {
  admin: {
    exclude: '/api/admin/exclude',
  },
  analytics: {
    linkClicks: '/api/analytics/link-clicks',
    pageViews: '/api/analytics/page-views',
    preSaves: '/api/analytics/pre-saves',
  },
  spotify: {
    authenticate: '/api/spotify/authenticate',
    callback: '/api/spotify/callback',
  },
}
