import React from 'react'

import { ThemeProvider, createTheme, createGlobalStyles } from 'swf-theme'
import FullPalette from './components/FullPalette'

const theme = createTheme({
	colors: {
		primary: '#ff4666',
		secondary: 'green',
	},
})

theme.addCSS({
	h6: `
		color: black;
	`,
})

const GlobalStyles = createGlobalStyles(theme)

const App = () => {
	return (
		<>
			<GlobalStyles />
			<ThemeProvider theme={theme}>
				<FullPalette />
			</ThemeProvider>
		</>
	)
}

export default App
