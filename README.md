# swf-theme

> SwfSoft theming system for [Styled Components](https://styled-components.com)

---

swf-theme generates a theme object that is designed to be used to configure a [styled components theme](https://styled-components.com/docs/advanced#theming), however it is not strickly opinionated and in addition to organizing values for styling, also exposes other useful methods for working with colors, typography, etc.

NOTE: Documentation is for version 2.0.1

---

## Install

```bash
yarn add @swfsoft/swf-theme
```

or

```bash
npm install --save @swfsoft/swf-theme
```

## Basic Usage

This will return a theme object that can be used throughout your application:

```jsx
import {createTheme} from '@swfsoft/swf-theme'

createTheme(<options>)
```

NOTE: (this will accept custom defaults, to use your own defaults see "Typical Usage" below)

---

## Typical Usage (with styled components)

First install styled components:

```
npm install --save styled-components
```

#### Create theme file

Create a file somewhere in your project (generally close to the root or src directory):

```
src/theme.js
```

#### Create theme

In theme.js instantiate and export your theme:

NOTE: for full list of defaults that can be overriden see below

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

#### Create global styles (optional)

[Styled-components](https://styled-components.com/docs/api#createglobalstyle) provides a helper function for generating global styles.

These global styles additionally have direct access to the theme just like a typical styled component.

HINT: These should be used sparingly and only target blanket html elements for reset, or default purposes. Generally, the real power of styled-components is to scope your styles to specific components.

**Global styles can be exported from the theme.js file:**

```jsx
import {createGlobalStyles} from 'styled-components'
import { createTheme } from '@swfsoft/swf-theme'

export const ProjectGlobalStyles = createGlobalStyles`
  body {
    position: relative;
    color: ${props => (props.theme.colors.black.val)};
  }
`

const theme = createTheme({
	colors: {
		// override default colors
		primary: '#fff',
		secondary: '#fff',
    ...

```

```jsx
import { GlobalStyles } from './components/theme.js'

const App = () => {
	;<>
		<GlobalStyles />
		//...rest of your app
	</>
}
```

### Create the theme provider

Styled-components provides a theme provider that should included at the entry point to your app.

NOTE: GlobalStyles must be rendered inside of the ThemeProvider.

HINT: Render the ProjectGlobalStyles after the GlobalStyles from Swf-Theme to override these.

```jsx
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '@swfsoft/swf-theme'
import theme, { ProjectGlobalStyles } from 'src/theme'

const App = ({ children }) => (
	<ThemeProvider theme={theme}>
		<GlobalStyles />
		<ProjectGlobalStyles />
		{children}
	</ThemeProvider>
)
```

### Use the theme in components

The theme is automatically inserted as props in all styled components throughout the app:

Fo more information about using styled-components take a look at their [documentation](https://styled-components.com/docs/)

```jsx
import styled from 'styled-components'

const MyComponent = styled.div`
	color: ${props => props.theme.colors.primary.val};
`
```

---

## Theme Options

| Option         | Details                  | Defaults                  |
| -------------- | ------------------------ | ------------------------- |
| colors         | See defaults for options | See color defaults below  |
| colorFallbacks | See defaults for options | See color fallbacks below |
| breaks         | See defaults for options | See breaks defaults below |
| sizes          | See defaults for options | See sizes defaults below  |
| times          | See defaults for options | See times defaults below  |

---

## Colors

Swf-theme will create an instance of a SwfColor handler class for every color that can be used to run a handful of useful color manipulation operations.

NOTE: Swf-theme uses [TinyColor2](https://github.com/bgrins/TinyColor) to perform color manipulation operations under the hood.

Available operations:
| | Description | Default value |
|--------|------------------------------------------------------------|---------------|
| light | Will lighten the color by a percentage value from 7-100 | 25 |
| dark | Will darken the color by a percentage value from 7-100 | 20 |
| sat | Will saturate the color by a percentage value from 7-100 | 40 |
| desat | Will desaturate the color by a percentage value from 7-100 | 40 |
| tint | Will change the opacity to a percentage value | 25 |
| invert | Will invert the color based on the standard color wheel | n/a |

### Preset operations

You may notice that the percentage value for operations is from 7-100. That's because the values 0-6 are reserved for presets. These are useful for more consistent variations across the application.

The presets are automatically generated off of the colorFallback settings and are based on a percentage offset below and above the fallback, where each number from 0-6 represent a value either above or below the fallback percentage.

For example the `light` operation presets look like this (assuming the fallback is the default value of `25`%):
| | Lightens color by | Multiplier |
|---|-------------------|------------|
| 0 | 10% | 0.4 |
| 1 | 15% | 0.6 |
| 2 | 20% | 0.8 |
| 3 | 25% | 1 |
| 4 | 30% | 1.2 |
| 5 | 35% | 1.4 |
| 6 | 40% | 1.6 |

NOTE: The same multipliers are used for `light`, `dark`, `sat`, and `desat` operations.

`tint` operation does not use presets but if no value is passed in will use fallback value (default is `25`).

**example usege with styled-components:**

Lightens primary color value by 25% (no value defaults to preset of `3`)

```jsx
import styled from 'styled-componets'

const MyStyledDiv = styled.div`
	color: ${props => props.theme.colors.primary.light().val};
`
```

Lightens by 15% (based on preset table above)

```jsx
import styled from 'styled-componets'

const MyStyledDiv = styled.div`
	color: ${props => props.theme.colors.primary.light(1).val};
`
```

Lightens by 7% (only values `0-6` use presets, so we just use the raw value as a percentage)

```jsx
import styled from 'styled-componets'

const MyStyledDiv = styled.div`
	color: ${props => props.theme.colors.primary.light(7).val};
`
```

NOTE: values above `100` are treated as 100%.

**Operations can also be chained:**
Lightens by 22% and changes opacity to 60%

```jsx
import styled from 'styled-componets'

const MyStyledDiv = styled.div`
	color: ${props => props.theme.colors.primary.light(22).tint(60).val};
`
```

**Calling `.val`**

Since all operations return another SwfColor class instance you will need to use `.val` at the end to return the calculated color value.

This includes the raw color (remember this is also SwfColor class instance):

```jsx
import styled from 'styled-componets'

const MyStyledDiv = styled.div`
	color: ${props => props.theme.colors.primary.val};
`
```

### Defaults

**Main defaults:**
| | Default | Intended usage |
|-----------|-----------|---------------------------------------------------------|
| primary | #0569b1 | backgrounds, borders, etc |
| secondary | #f7a707 | CTAs, links, emphasis, etc |
| aux1 | #7990ad | accent color - less emphasis, sub-content for CTA, etc. |
| aux2 | #79a6ad | Alternative accent color - rarely needed |

**Utility defaults:**
| | Default | Description |
|----------|---------|--------------------------------------|
| ok | #5bbb12 | green - success color |
| err | #df1500 | red - error/alert color |
| warn | #ff9900 | orange - warning/info color |
| disabled | #c0c4c5 | grey - disabled interactive elements |

---

**Monochromatic defaults**
| | Default | Intended usage |
|-------|---------|-----------------|
| black | #000 | General purpose |
| white | #FFF | General purpose |
| grey | #868b8d | General purpose |

**By Name Defaults**
| | Default |
|----------|---------|
| blue | #0e8be4 |
| brown | #866f3c |
| purple | #7032d0 |
| orange | #e88d00 |
| slate | #3a3f42 |
| midnight | #1c1e1f |

**Fallback defaults**

```js
colorFallbacks: {
  lighten: 25,
  darken: 25,
  saturate: 40,
  desaturate: 40,
  tint: 0.25
}
```

## Breaks

Break-point presets. Also see Media below for media queries.

Default breaks:

```js
{
  tablet: {
    num: 767
    px: '767px'
  },
  // small desktop
  sdesk: {
    num: 1112
    px: '1112px'
  },
  // large desktop
  ldesk: {
    num: 1480
    px: '1480px'
  },
}
```

## Media

There are some media query builder helpers that use the values set in the breaks.

Example tablet media query:

```jsx
import styled from 'styled-components'

const StyledComponent = styled`
  ${props => props.theme.media.tablet} {
    display: block;
  }
`
```

This is the same as:

```css
@media only screen and (min-device-width: ${props => (props.theme.breaks.tablet.px)}) {
  display: block;
}
```

Options:

|        | Targets                          | Media Query (based on default breaks)      |
| ------ | -------------------------------- | ------------------------------------------ |
| mobile | under tablet width (mobile only) | @media only screen and (max-width: 766px)  |
| tablet | tablet width and above           | @media only screen and (min-width: 767px)  |
| sdesk  | sdesk width and above            | @media only screen and (min-width: 1112px) |
| ldesk  | ldesk width and above            | @media only screen and (min-width: 1480px) |

---

## Times

For css transitions, animations, etc.

HINT: When accessed via `useTheme`, these are also handy for setTimouts or triggered transitions in js that need to time with css transitions.

NOTE: Values are in milliseconds

defaults:

```js
{
  short: 100
  med: 250
  long: 500
  ease: "ease-in-out"
  // handy presets for css transitions
  tranS: "100ms ease-in-out",
  tranM: "250ms ease-in-out",
  tranL: "500ms ease-in-out"
}

```

---

## Sizes

Semi-opinionated values for maintaining global styles accross your app.

defaults:

```js
{
  fonts: {
    // base font size (GlobalStyles automatically applies this to the body tag)
    base: {
      px: "15px",
      num: 15
    },
  },
  // global header
  header: {
    mobile: {
      px: "40px",
      num: 40
    },
    tablet: {
      px: "50px",
      num: 50
    },
    sdesk: {
      px: "80px",
      num: 80
    }
  }
  // page gutters (spacing from left and right sides of the view port)
  gutter: {
    mobile: {
      em: "1.1em",
      num: 1.1
    },
    tablet: {
      vw: "0.5vw",
      num: 0.5
    },
    sdesk: {
      vw: "4vw",
      num: 4
    },
    ldesk: {
      vw: "6vw",
      num: 6
    }
  }
}
```

---

## Fonts

TODO: add docs

### FluidFontSizes

Function for generating font-sizes using css calculations. It returns css calculations based on options passed in (if no options passed in, will use values when creating the theme)

Example with styled-components:

```jsx
import styled from 'styled-components'
import { fluidFontSize } from '@swfsoft/swf-theme'

const H1 = styled.h1`
	${fluidFontSize({
		minSize: 22, // in pixels
		maxSize: 45, // in pixels
		minViewport: 320, // is fixed at minSize below this threshold (defaults to breaks.mobile)
		maxViewport: 1480, // is fixed at maxSize above this threshold (defaults to breaks.ldesk)
	})}
`
```

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

## Typescript

Swf-theme is built on typescript and exports the following types:

- Theme
- ThemeConfig

In order to use Swf-theme in typescript project with styled-components you will need to follow the steps laid out in [styled-components](https://styled-components.com/docs/api#typescript) for getting type support inside styled components:

### Install types:

```
npm install @types/styled-components
```

### Create declarations file:

```ts
import 'styled-components'
import {Theme} from '@swfsoft/swf-theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme
}
```

Now you should get type inference inside of styled components

---

## License

MIT © [swiftforge](https://github.com/swiftforge)
