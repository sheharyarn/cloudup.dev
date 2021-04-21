module.exports = {
  siteMetadata: {
    title: `CloudUp`,
    author: {
      name: `Sheharyar Naseer`,
      website: `https://shyr.io/`,
    },
    description: `Tools to jump start your development on the cloud`,
    siteUrl: `https://shyr.io/`,
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
    {
      resolve: `gatsby-plugin-manifest`,
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
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: 'white',
        showSpinner: true,
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
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              aliases: {
                conf: `nginx`,
                sh: `shell`
              }
            }
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-47788797-3`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-root-import`,
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
}
