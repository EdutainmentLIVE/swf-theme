/*
 =================================================
	React component for displaying palettes for all default color types
 =================================================
* */
import React from 'react'
import Palette from './Palette'

const FullPalette = () => {
	return (
		<React.Fragment>
			<Palette />
			<Palette bg='black' />
			<Palette color='secondary' />
			<Palette color='secondary' bg='black' />
			<Palette color='err' />
			<Palette color='err' bg='black' />
			<Palette color='ok' />
			<Palette color='ok' bg='black' />
			<Palette color='warn' />
			<Palette color='warn' bg='black' />
			<Palette color='grey' />
			<Palette color='grey' bg='black' />
			<Palette color='disabled' />
			<Palette color='disabled' bg='black' />
		</React.Fragment>
	)
}
export default FullPalette
