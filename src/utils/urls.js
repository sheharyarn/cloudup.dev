/**
 * URL Helpers
 */

module.exports = {
  root: () => `/`,

  docker: {
    root:     ()                  => `/docker`,
    platform: (platform)          => `/docker/${platform}`,
    variant:  (platform, variant) => `/docker/${platform}/${variant}`,
  },

  twitter: {
    profile:  (username)          => `https://twitter.com/${username}`,
  },

};

