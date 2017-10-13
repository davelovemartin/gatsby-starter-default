import React from 'react'
import PropTypes from 'prop-types'
import palx from 'palx'
import Helmet from 'react-helmet'
import { Provider } from 'rebass'
import { injectGlobal } from 'styled-components'

injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; }`

const palette = palx('#c92929')

const flattened = Object.keys(palette)
   .reduce((a, key) => {
     const value = palette[key]
     if (Array.isArray(value)) {
       a[key] = value[5]
       value.forEach((val, i) => {
         a[key + i] = val
       })
     } else {
       a[key] = value
     }
     return a
   }, {})

export const colors = Object.assign({}, flattened, {
  black: '#231f20',
  jet: '#070606',
  white: '#ffffff'
})

const TemplateWrapper = ({ children, data }) => (
  <Provider
    theme={{
      font: '"FuturaStd-Book", sans-serif',
      fontSizes: [
        12, 16, 24, 32, 48, 64
      ],
      colors: colors
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
