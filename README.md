# swf-theme

> Theming system for swf react.js projects.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

NOTE: The swf-ui component library is built on top of swf-theme, and swf-theme is built on top of styled components and tiny color.

## Install

```bash
npm install --save @swfsoft/swf-theme
```

## Basic Usage

In the top level entry point of your app (e.g., App.js):

```jsx
import {createTheme} from '@swfsoft/swf-theme'

createTheme(<options>)
```

NOTE: (this will accept custom defaults, to use your own defaults see "Typical Usage" below)

---

## Typical Usage

#### Create theme file

This can live anywhere in your directory structure but typical convention would be to have it somewhere near or inside of your components directory:

```
components/theme.js
```

#### Instantiate theme

In theme.js instantiate and export your theme:

```jsx
import { createTheme } from '@swfsoft/swf-theme'

const theme = createTheme({
	colors: {
		// override default colors
		primary: '#fff',
		secondary: '#fff',

		//NOTE: all default color types below

		// add your own colors
		myColor: '#fff',
	},

	breaks: {
		// override breakpoints
		// NOTE: these must be number values
		tablet: 767,
		sdesk: 1100, // small desktop
		ldesk: 1480, // large desktop
		// NOTE: we encourage mobile first dev by using min-width media queries
	},
})

export default theme
```

#### Add theme to top of your app

In the top level entry point of your app we can add our global styles from the theme:

NOTE: These should be before any other styles

```jsx
import { GlobalStyles } from './components/theme.js'

const App = () => {
	;<>
		<GlobalStyles />
		//...rest of your app
	</>
}
```

#### Use the theme in your app

Now you should use this exported theme everywhere in your app that you need it.

NOTE: all methods such as color methods should accessed from the theme that is exported from theme.js

---

### Call individual methods

```jsx
import { colors } from '@swfsoft/swf-theme'
// This will be the default colors - to use your own colors see "Typical Usage" above

const primaryColor = colors.primary()
```

## Colors

The general color theory for swf-theme is to use as few as possible (we have found that most apps only probably need two colors - primary and secondary).

All colors are assigned a handler method that can be called when accessing that color:

```jsx
import { colors } from '@swfsoft/swf-theme'

const primaryColor = colors.primary()
```

These methods accept either a preset string argument or else an options object.

Example with preset string argument:

```jsx
const lightPrimaryColor = colors.primary('light')
// returns the color lightened by the lightenAmount in the colorSettings
```

Example with options object:

```jsx
const lightPrimaryColor = colors.primary({ lighten: 20 })
// returns the color lightened by the darkenAmount in the colorSettings
```

### Color Settings

NOTE: These are passed in when creating the theme e.g.:

```jsx
createTheme({
	colorSettings: {
		lightenAmount: 25,
	},
})
```

| Setting       | Description                                                                                            | Default |
| ------------- | ------------------------------------------------------------------------------------------------------ | ------- |
| lightenAmount | base number (1-100) to use during lighten preset calculations. Note: this will be 'light' and 'light3' | 25      |
| darkenAmount  | base number (1-100) to use during darken preset calculations. Note: this will be 'dark' and 'dark3'    | 20      |
| tintOpacity   | default tint opacity (when using preset 'tint'). Note: this will be 'tint'                             | 0.25    |

### Color method options

NOTE: These are passed in when calling the color method (e.g., `primary({lighten: 30})`)
| Option | Description |
|---------- |------------------------------------ |
| lighten | lightens color by number (1-100) |
| darken | darkens color by number (1-100) |
| brighten | brightens color by number (1-100) |
| opacity | sets opacity by number (0-1) |
| desat | desaturate color by number (1-100) |
| sat | saturate color by number (1-100) |
| invert | inverts color on color wheel |

### Color method presets

Handy preset built in color methods
NOTE: These should be entered as a string (e.g., `primary('light3')`)
| Preset | Description |
|--------------------- |-------------------------------------------------------- |
| light | same as 'light3' |
| light1-6 ('light3') | lightened incrementally based on 'lightenAmount' value |
| dark | same as 'dark3' |
| dark1-6 ('dark3') | darkened incrementally based on 'darkenAmount' value |
| tint | same as 'tint3' |
| tint0-10 ('tint3') | adjusts alpha in increments of 10% (rgba(0,0,0,0.3) |
| tint05 | special 5% alpha |

NOTE: All color processes are handled by [TinyColor](https://github.com/bgrins/TinyColor)

## Breaks

Break-point presets.

Example:

```jsx
import { breaks } from '@swfsoft/swf-theme'

const tabletBreakpoint = breaks.tablet.px
```

Default breakpoints look like:

```jsx
{
  tablet: {
    num: 767
    px: '767px'
  },
  sdesk: {
    num: 1112
    px: '1112px'
  },
  ldesk: {
    num: 1480
    px: '1480px'
  },
}
```

## Media

There are some media query builder helpers that use the values set in the breaks.

Example media helper using styled components:

```jsx
import styled from 'styled-components'
import { media } from '@swfsoft/swf-theme'

const StyledComponent = styled`
  ${media.tablet} {
    display: block;
  }
`
// same as: @media only screen and (min-device-width: ${breaks.tablet.px})
```

## Fonts

#### Heading element sizes

Can be found at:

```jsx
import {fonts} from '@swfsoft/swf-theme'

const {sizes} = fonts

const {
	h1: {
		num: 4,
		em: '4em' // by default h sizes use em units, but this can be set at fonts.hUnit
	},
	h2,
	h3,
	etc...
} = sizes
```

#### FluidFontSizes

Function for generating font-sizes using css calculations. It returns css calculations based on options passed in (if no options passed in, will use values when creating the theme)

Example with styled-components:

```jsx
import styled from 'styled-components'
import { fluidFontSize } from '@swfsoft/swf-theme'

const H1 = styled.h1`
	${fluidFontSize({
		minSize: 22, // in pixels
		maxSize: 45, // in pixels
		minViewport: 320, // is fixed at minSize below this threshold
		maxViewport: 1480, // is fixed at maxSize above this threshold
	})}
`
```

NOTE: All heading elements have fluidFontSizes applied in the GlobalStyles -see below

## Global styles

swf-theme also provides a GlobalStyles styled-component. This is generated when creating the theme and should be placed at the top level of your app before any other global styles used in the app.

### Usage

```jsx
import { GlobalStyles, createTheme } from '@swfsoft/swf-theme'

createTheme()

const App = () => {
	;<>
		<GlobalStyles />
		//...rest of your app
	</>
}
```

### Global style classes

In addition to performing a number of base styles and resets (uses [styled-reset](https://www.npmjs.com/package/styled-reset)), the global styles also enables a handful of useful classes that can be used anywhere in the app.

#### .flex

```jsx
.flex {
	display: flex;
	flex-wrap: wrap;
}
```

#### .flex-tablet

same as .flex but only affects breaks.tablet and larger screens

#### .flex-desk

same as .flex but only affects breaks.sdesk and larger screens

#### .overlay

```jsx
.overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${colors.bg('tint80')};
}
```

#### .cta

```jsx
.cta {
	display:flex;
	align-items: center;
	justify-content: center;
	padding: 0.5em 1em;
	text-transform: uppercase;
	font-size: 1.1em;
	.icon {
		margin-right: 0.5em;
	}
	${media.tablet} {
		padding: 1em 2em;
	}
	${media.sdesk} {
		font-size: 1.2em;
	}
}
```

#### .rt and .rich-text

These are some base styles for content that comes in from richtext sources.

These do things like:

- Add bullets and numbers to ul and ol
- Add margins to block level typographical elements (p, h, etc.)
- Constrain images to their parent containers

#### h elements

By default these elements will use css calculations to fluidly change their font size based on screen size.
(These do have a fallback em size as well for browsers that don't support css calculations).

The calculations can be adjusted by setting font options when creating the theme:

```jsx
createTheme({
	fonts: {
		hMin: 1.1, // minimum font size (will be fallback size for h6)
		hMax: 4, // max font size (will be fallback size for h1)
		hUnit: 'em', // unit for generating fallbacks
	},
})
```

## Theme Options

> Todo: finish this section

## License

ISC © [swiftforge](https://github.com/swiftforge)
