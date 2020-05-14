import React from 'react'

import { FullPalette, ThemeProvider, createTheme, createGlobalStyles } from 'swf-theme'

const theme = createTheme({
	colors: {
		primary: 'pink',
		secondary: 'green',
	},
})

theme.addCSS({
	h6: `
		color: black;
	`,
})

const GlobalStyles = createGlobalStyles(theme, {
	swfUICss: `
	section {
		border: solid 4px grey;
	}
`,
})

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
