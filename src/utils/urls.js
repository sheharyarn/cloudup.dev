/**
 * URL Helpers
 */

const removeTrailingSlash = (url) => {
  return (url[url.length - 1] == "/") ? url.substr(0, url.length - 1) : url;
}


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

  utils: {
    isEqual: (url1, url2) => {
      return removeTrailingSlash(url1) === removeTrailingSlash(url2);
    }
  }
};

