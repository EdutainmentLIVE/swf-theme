import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { fluidFontSize } from './font.helpers'

export const generateGlobalStyles = (config, globalStyleFN) => {
	const { colors, times, media, fonts, breaks, fontFaces = '', isDarkMode } = config

	const disabledGrey = isDarkMode ? colors.grey('dark4') : colors.grey('light4')

	console.log('global styles config: ', config)

	const styles = `
    ${reset}
    ${fontFaces}
    
		html {
			background-color: ${colors.bg()};
		}
		body {
			color: ${colors.text()};
			font-size: ${fonts.baseSize};
			font-family: ${fonts.textFamily};
    }

    p,span,button,a,ul,li,textarea,input,blockquote,pre,div,aside,nav,header,footer,cite,section,ol {
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
    }

    p,div,h1,h2,h3,h4,h5,h6,section,aside,header,footer,blockquote,ul,ol,nav {
      display: block;
      position:relative;
      box-sizing: border-box;
    }

    p {
      margin: 0.5em 0;
    }

    em {
      font-style: italic;
      color: ${isDarkMode ? colors.text('dark4') : colors.text('light4')};
    }

    strong {
      font-weight: bolder;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: ${fonts.titleFamily};
    }
    h1 {
      font-size: ${fonts.sizes.h1.em};
      ${fluidFontSize({
				maxSize: fonts.baseSize.num * fonts.sizes.h1.num + fonts.baseSize.num,
				minSize: Math.max(fonts.baseSize.num * fonts.sizes.h1.num * 0.7, fonts.baseSize.num * 1.1),
				maxViewport: breaks.ldesk.num,
				minViewport: breaks.tablet.num * 0.7,
			})}
    }
    h2 {
      font-size: ${fonts.sizes.h2.em};
      ${fluidFontSize({
				maxSize: fonts.baseSize.num * fonts.sizes.h2.num + fonts.baseSize.num,
				minSize: Math.max(fonts.baseSize.num * fonts.sizes.h2.num * 0.7, fonts.baseSize.num * 1.1),
				maxViewport: breaks.ldesk.num,
				minViewport: breaks.tablet.num * 0.7,
			})}
    }
    h3 {
      font-size: ${fonts.sizes.h3.em};
      ${fluidFontSize({
				maxSize: fonts.baseSize.num * fonts.sizes.h3.num + fonts.baseSize.num,
				minSize: Math.max(fonts.baseSize.num * fonts.sizes.h3.num * 0.7, fonts.baseSize.num * 1.1),
				maxViewport: breaks.ldesk.num,
				minViewport: breaks.tablet.num * 0.7,
			})}
    }
    h4 {
      font-size: ${fonts.sizes.h4.em};
      ${fluidFontSize({
				maxSize: fonts.baseSize.num * fonts.sizes.h4.num + fonts.baseSize.num,
				minSize: Math.max(fonts.baseSize.num * fonts.sizes.h4.num * 0.7, fonts.baseSize.num * 1.1),
				maxViewport: breaks.ldesk.num,
				minViewport: breaks.tablet.num * 0.7,
			})}
    }
    h5 {
      font-size: ${fonts.sizes.h5.em};
      ${fluidFontSize({
				maxSize: fonts.baseSize.num * fonts.sizes.h5.num + fonts.baseSize.num,
				minSize: Math.max(fonts.baseSize.num * fonts.sizes.h5.num * 0.7, fonts.baseSize.num * 1.1),
				maxViewport: breaks.ldesk.num,
				minViewport: breaks.tablet.num * 0.7,
			})}
    }
    h6 {
      font-size: ${fonts.sizes.h6.em};
      ${fluidFontSize({
				maxSize: fonts.baseSize.num * fonts.sizes.h6.num + fonts.baseSize.num,
				minSize: Math.max(fonts.baseSize.num * fonts.sizes.h6.num * 0.7, fonts.baseSize.num * 1.1),
				maxViewport: breaks.ldesk.num,
				minViewport: breaks.tablet.num * 0.7,
			})}
      font-weight: bold;
    }

    .flex {
      display: flex;
      flex-wrap: wrap;
    }
    .flex-tablet {
      ${media.tablet} {
        display: flex;
        flex-wrap: wrap;
      }
    }
    .flex-desk {
      ${media.sdesk} {
        display: flex;
        flex-wrap: wrap;
      }
    }

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

    button, a, input, textarea {
      outline: none;
      box-sizing: border-box;
      box-shadow: none;
      background: none;
      border-color: inherit;

      transition: all ${times.short}ms ${times.ease};

      &:hover, &:focus {
        outline: none;
      }
      &:hover {
        cursor: pointer;
      }
      
      &:disabled {
        color: ${disabledGrey};
        border-color: ${disabledGrey};
        fill: ${disabledGrey};
        &:hover, &:focus {
          color: ${disabledGrey};
          border-color: ${disabledGrey};
          fill: ${disabledGrey};
        }
        &:hover {
          cursor: default;
        }
      }
    }
    button, textarea {
      display: inline-block;
    }
    a, button {
      text-decoration: none;
      color: ${colors.secondary()};
      &:hover {
        color: ${colors.secondary({ brighten: 10 })};
      }
    }

    ul {
      list-style-type: none;
    }

    .rt, .rich-text {
      ul, ol {
        margin: .5em 1em .5em 2em;
      }
      ul {
        list-style-type: disc;
      }
      ol {
        list-style-type: decimal;
      }
    }

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
	`
	if (globalStyleFN) return globalStyleFN`${styles}`
	return createGlobalStyle`${styles}`
}
