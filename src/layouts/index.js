import React from 'react'
import palx from 'palx'
import { Provider } from 'rebass'
import { injectGlobal } from 'styled-components'

injectGlobal`
  * {
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
  }
  body {
    margin: 0;
  }
  @font-face {
    font-family: "Futura";
    font-style: normal;
    font-weight: normal;
    src: local("Futura"), url('https://www.callofthebrave.org/fonts/futura.ttf') format("ttf"), url('https://www.callofthebrave.org/fonts/futura.eot') format("eot"), url('https://www.callofthebrave.org/fonts/futura.woff') format("woff");
  }
`

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

const TemplateWrapper = props => (
  <Provider
    theme={{
      breakpoints: [ 32, 48, 64, 80 ],
      font: '"Futura", sans-serif',
      fontSizes: [
        9, 12, 16, 24, 32, 48, 64
      ],
      colors: colors,
      radius: 4,
      space: [ 0, 4, 8, 16, 32, 64, 128 ],
      weights: [ 400, 700 ]
    }}
  >
    {props.children()}
  </Provider>
)

export default TemplateWrapper
