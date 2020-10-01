import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTheme } from 'swf-theme'

const H1 = styled.h1`
  color: ${props => props.theme.colors.primary.light(4).val};
  color: ${props => props.color};
  font-size: ${props => props.theme.sizes.gutter.mobile.em};
  background: ${props => props.bgColor};
`

const Test = () => {
  const { colors } = useTheme()
  const bgColor = colors.black.desat().val
  const color = colors.black.invert().val
  return (
    <H1 bgColor={bgColor} color={color} className='test'> Test</H1>
  )
}
Test.propTypes = {

}
export default Test