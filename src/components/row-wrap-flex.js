import React from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'

const RowWrap = styled(Flex)`
  display: -webkit-flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  -webkit-align-content: flex-end;
  align-content: flex-end;
`

const RowWrapFlex = props => (
  <RowWrap {...props} />
)

export default RowWrapFlex
