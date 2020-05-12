import React from 'react'

import { FullPalette, createTheme } from 'swf-theme'

createTheme({
	colors: {
		primary: '#f7a707',
		secondary: '#0569b1',
	},
})

const App = () => {
	return <FullPalette />
}

export default App
