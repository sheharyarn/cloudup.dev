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

  github: {
    repo:     (user, repo)        => `https://github.com/${user}/${repo}`,
  },

};

