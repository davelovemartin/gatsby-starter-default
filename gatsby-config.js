module.exports = {
  siteMetadata: {
    title: `Call of the Brave`,
    description: `Call of the Brave | ethical t-shirts | raising money for people affected by unfair fashion`,
    googleSiteVerification: `rVmZehAW-IN8rTPkf-ZwX-J3yfSW6zStVFQpPdAYtXI`,
    fbAppId: `1544287262531450`,
    twitter: `@callofthebrave`,
    url: `https://www.callofthebrave.org`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-lodash`,
      options: {
        disabledFeatures: [`shorthands`, `cloning`, `currying`, `caching`, `collections`, `guards`, `metadata`, `deburring`, `unicode`, `memoizing`, `coercions`, `flattening`, `paths`, `placeholders`]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-36478003-5'
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#c92929`,
        showSpinner: false
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `w7fkxqla98a9`,
        accessToken: `a87d647801da43775c82fea659bf5b711419b41f592b052ae6e3d10dd4e4a64b`
      }
    }
  ]
}
