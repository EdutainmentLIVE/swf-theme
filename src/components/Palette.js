/*
 =================================================
	React Component for displaying a color palette based of one of the color
 =================================================
* */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { config, colors } from '../theme'

const Block = styled.span`
	display: inline-block;
	margin-left: 1em;
	width: 3em;
	height: 1em;
	background: ${props => props.color};
`
const Wrap = styled.div`
	background: ${props => colors[props.bg]()};
	color: ${props => colors[props.bg]({ invert: true })};
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
const ColorStrip = styled.h1`
	display: flex;
	align-items: center;
	color: ${props => props.color};
	padding: 0.4em 1.5em;
	margin: 0;
`
const H1 = ({ color, methodName, method }) => {
	const colorVal = colors[color](method || methodName)
	return (
		<ColorStrip className='color-strip' color={colorVal}>
			{methodName || color} <Block color={colorVal} />
		</ColorStrip>
	)
}
const Col = ({
	color,
	method,
	max = 6,
	samples,
	multiplier = 1,
	default: defaultText,
	includeZero = true,
}) => {
	const defaultTxt = defaultText
		? `NOTE: ${defaultText}`
		: `NOTE: ${method} = ${method}3`

	return (
		<div className='col'>
			<h3>{`colors.${color}(${method})`}</h3>
			<H1 color={color} methodName={method} />
			<em>{defaultTxt}</em>
			<React.Fragment>
				{samples
					? samples.map(s => (
						<H1 color={color} methodName={`${method}${s}`} key={s} />
					))
					: Array(max + 1)
						.fill('')
						.map((_, i) =>
							i > 0 || includeZero ? (
								<H1
									color={color}
									methodName={`${method}${i * multiplier}`}
									key={`${method}${i * multiplier}`}
								/>
							) : null
						)}
			</React.Fragment>
		</div>
	)
}

const ColorPalette = ({ color = 'primary', bg = 'white' }) => {
	return (
		<Wrap bg={bg}>
			<H1 color={color} />
			<div className='flex'>
				<Col color={color} method='light' />
				<Col color={color} method='dark' />
				<Col
					color={color}
					method='tint'
					samples={['05', 10, 20, 30, 40, 50, 60, 70, 80, 90]}
					default={`tint = opacity of ${config.colorSettings.tintOpacity}`}
				/>
				<div className='col'>
					<H1 color={color} method={{ brighten: 25 }} methodName='brighten25' />
				</div>
			</div>
		</Wrap>
	)
}
ColorPalette.propTypes = {
	color: PropTypes.string,
}
export default ColorPalette
