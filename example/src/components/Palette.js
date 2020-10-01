/*
 =================================================
	React Component for displaying a color palette based of one of the color
 =================================================
* */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import isString from 'lodash/isString'
import { useTheme } from 'swf-theme'

const Block = styled.span`
	display: inline-block;
	margin-left: 1em;
	width: 3em;
	height: 1em;
	background: ${props => props.color};
`
const Wrap = styled.section`
	background: ${props => props.theme.colors[props.bg].val};
	color: ${props => props.theme.colors[props.bg].invert().val};
	padding: 1em;
	.flex {
		display: flex;
		.col {
			border-right: solid 1px;
		}
	}
	.color-strip {
	}
`
const ColorStrip = styled.h6`
	display: flex;
	align-items: center;
	color: ${props => props.color};
	padding: 0.4em 1.5em;
	margin: 0;
`
const H = ({ colorVal, method, preset }) => {
	const colr = isString(colorVal) ? colorVal : 'black'
	return (
		<ColorStrip className='color-strip' color={colr}>
			{preset ? `${method}(${isString(preset) ? `'${preset}'` : preset})` : method}{' '}
			{colorVal && <Block color={colr} />}
		</ColorStrip>
	)
}
const Col = ({ colorName, method, colorVal, presets, default: defaultText }) => {
	const defaultTxt = defaultText ? `NOTE: ${defaultText}` : `NOTE: ${method} = ${method}('3')`
	const { colors } = useTheme()
	const color = colorVal || colors[colorName][method]().val
	console.log('colorName: ', colorName, 'method: ', method, ' results in: ', color)
	return (
		<div className='col'>
			<p>{`colors.${colorName}.${method}`}</p>
			<H colorVal={color} method={method} />
			<em>{defaultTxt}</em>
			<React.Fragment>
				{presets &&
					presets.map(preset => {
						// console.log(
						// 'colors: ',
						// colors,
						// 	' | colorName: ',
						// 	colorName,
						// 	' | method: ',
						// 	method,
						// 	' | preset: ',
						// 	preset
						// )
						return (
							<H
								colorVal={colors[colorName][method](preset).val}
								method={method}
								preset={preset}
								key={preset}
							/>
						)
					})}
			</React.Fragment>
		</div>
	)
}

const ColorPalette = ({ color: colorName = 'primary', bg = 'white' }) => {
	const { colors } = useTheme()
	// console.log('Palette rendering with theme: ', theme)
	return (
		<Wrap bg={bg}>
			<H method={colorName} colorVal={colors[colorName].val} />
			<div className='flex'>
				<Col colorName={colorName} method='light' presets={['0', '1', '2', '3', '4', '5', '6']} />
				<Col colorName={colorName} method='dark' presets={['0', '1', '2', '3', '4', '5', '6']} />
				<Col
					colorName={colorName}
					method='tint'
					colorVal={colors[colorName].tint().val}
					presets={[5, 10, 20, 30, 40, 50, 60, 70, 80, 90]}
					default={`tint = opacity of ${colors.colorSettings.tintOpacity}`}
				/>
			</div>
		</Wrap>
	)
}
ColorPalette.propTypes = {
	color: PropTypes.string,
}
export default ColorPalette
