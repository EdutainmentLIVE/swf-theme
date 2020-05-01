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

---

## Usage

### Instantiate theme

```jsx
import { createTheme } from '@swfsoft/swf-theme'

createTheme({
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
```

### Call individual methods

```jsx
import { colors } from '@swfsoft/swf-theme'

const primaryColor = colors.primary()
```

## Colors

The general color theory is to use as few as possible (most apps only probably need two colors - primary and secondary).

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

NOTE: All color processes are handled by [TinyColor](https://github.com/bgrins/TinyColor)

### Color Settings

NOTE: These are passed in when creating the theme e.g.:

```jsx
createTheme({
	colorSettings: {
		lightenAmount: 25,
	},
})
```

| Setting       | Description                                              | Default |
| ------------- | -------------------------------------------------------- | ------- |
| lightenAmount | number (1-100) to use during lighten preset calculations | 25      |
| darkenAmount  | number (1-100) to use during darken preset calculations  | 20      |
| tintOpacity   | default tint opacity (when using preset 'tint')          | 0.25    |

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

> Todo: finish this section

## Theme Options

> Todo: finish this section

## License

ISC © [swiftforge](https://github.com/swiftforge)
