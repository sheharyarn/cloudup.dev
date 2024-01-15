/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `CloudUp`,
    description: `Quick tools for development on the cloud`,
    siteUrl: `https://cloudup.dev/`,
    author: {
      name: `Sheharyar Naseer`,
      website: `https://shyr.io/`,
    },
    social: {
      twitter: {
        user: 'sheharyarn',
      },
      github: {
        user: 'sheharyarn',
        repo: 'cloudup.dev',
      },
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-root-import`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: `CloudUp`,
        short_name: `CloudUp`,
        icon: 'static/icon.png',
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#1adba2`,
        display: `standalone`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['G-CBXXCYT1HN'],
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: 'white',
        showSpinner: true,
        minimum: 0.15,
      },
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: 'Yaml',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/docker`,
        name: `docker`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              aliases: {
                conf: `nginx`,
                sh: `shell`,
              },
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        sassOptions: {
          indentedSyntax: true,
          includePaths: ['src/styles'],
        },
        additionalData: `@import 'variables', 'breakpoints', 'mixins'`,
        useResolveUrlLoader: true,
      },
    },
  ],
};
