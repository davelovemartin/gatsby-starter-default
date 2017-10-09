import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Provider } from 'rebass'
import { injectGlobal } from 'styled-components'

injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; }`

const TemplateWrapper = ({ children, data }) => (
  <Provider
    theme={{
      font: '"FuturaStd-Book", sans-serif',
      fontSizes: [
        12, 16, 24, 32, 48, 64
      ],
      colors: {
        'base': '#c92929',
        'black': '#231f20',
        'jet': '#070606',
        'grey': [
          '#faf9f9',
          '#f0ecec',
          '#e5dfdf',
          '#dad0d0',
          '#cdc0c0',
          '#bfafaf',
          '#af9b9b',
          '#9c8383',
          '#816565',
          '#4b3b3b'
        ],
        'red': [
          '#f9eaea',
          '#f4d4d4',
          '#edbaba',
          '#e59b9b',
          '#db7272',
          '#c92929',
          '#b52525',
          '#9e2020',
          '#821a1a',
          '#5c1212'
        ],
        'yellow': [
          '#f7f7e2',
          '#efefc3',
          '#e7e7a2',
          '#dede7d',
          '#d4d455',
          '#c9c929',
          '#b5b525',
          '#9f9f20',
          '#84841b',
          '#5f5f13'
        ],
        'blue': [
          '#e7f0f9',
          '#cddff2',
          '#b0cdeb',
          '#8db8e2',
          '#639dd7',
          '#2979c9',
          '#246db5',
          '#205f9e',
          '#1a4e82',
          '#12375b'
        ]
      }
    }}
  >
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' }
      ]}
    />
    {children()}
  </Provider>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
