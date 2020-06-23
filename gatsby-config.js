module.exports = {
  siteMetadata: {
    title: `CloudUp`,
    author: {
      name: `Sheharyar Naseer`,
      website: `https://shyr.io/`,
    },
    description: `Tools to upstart your development on Cloud`,
    siteUrl: `https://shyr.io/`,
    social: {
      twitter: `https://twitter.com/sheharyarn`,
      github: `https://github.com/sheharyarn/`,
    },
  },
  plugins: [
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
        trackingId: ``,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-root-import`,
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: ['src/styles'],
        data: `@import 'variables', 'breakpoints', 'mixins';`,
      },
    },
  ],
}
