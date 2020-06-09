import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { fluidFontSize } from './font.helpers'

export const generateGlobalStyles = (config, opts = {}) => {
	const { colors, times, media, fonts, breaks, fontFaces = '', isDarkMode, css = {} } = config

	const disabledGrey = isDarkMode ? colors.grey.dark('4').val : colors.grey.light('4').val

	const { css: projectCSS, swfUICss } = opts
	const { global } = css

	const styles = `
    ${reset}
    ${fontFaces}
    
		html {
			background-color: ${colors.bg.val};
		}
		body {
			color: ${colors.text.val};
			font-size: ${fonts.baseSize.px};
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
      color: ${isDarkMode ? colors.text.dark('4').val : colors.text.light('4').val};
    }

    strong {
      font-weight: bolder;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: ${fonts.titleFamily};
    }
    h1 {
      font-size: ${fonts.sizes.h1.em};
      &.fluid {
        ${fluidFontSize({
					maxSize: fonts.baseSize.num * fonts.sizes.h1.num + fonts.baseSize.num,
					minSize: Math.max(
						fonts.baseSize.num * fonts.sizes.h1.num * 0.7,
						fonts.baseSize.num * 1.1
					),
					maxViewport: breaks.ldesk.num,
					minViewport: breaks.tablet.num * 0.7,
				})}
      }
    }
    h2 {
      font-size: ${fonts.sizes.h2.em};
      &.fluid {
        ${fluidFontSize({
					maxSize: fonts.baseSize.num * fonts.sizes.h2.num + fonts.baseSize.num,
					minSize: Math.max(
						fonts.baseSize.num * fonts.sizes.h2.num * 0.7,
						fonts.baseSize.num * 1.1
					),
					maxViewport: breaks.ldesk.num,
					minViewport: breaks.tablet.num * 0.7,
				})}
      }
    }
    h3 {
      font-size: ${fonts.sizes.h3.em};
      &.fluid {
        ${fluidFontSize({
					maxSize: fonts.baseSize.num * fonts.sizes.h3.num + fonts.baseSize.num,
					minSize: Math.max(
						fonts.baseSize.num * fonts.sizes.h3.num * 0.7,
						fonts.baseSize.num * 1.1
					),
					maxViewport: breaks.ldesk.num,
					minViewport: breaks.tablet.num * 0.7,
				})}
      }
    }
    h4 {
      font-size: ${fonts.sizes.h4.em};
      &.fluid {
        ${fluidFontSize({
					maxSize: fonts.baseSize.num * fonts.sizes.h4.num + fonts.baseSize.num,
					minSize: Math.max(
						fonts.baseSize.num * fonts.sizes.h4.num * 0.7,
						fonts.baseSize.num * 1.1
					),
					maxViewport: breaks.ldesk.num,
					minViewport: breaks.tablet.num * 0.7,
				})}
      }
    }
    h5 {
      font-size: ${fonts.sizes.h5.em};
      &.fluid {
        ${fluidFontSize({
					maxSize: fonts.baseSize.num * fonts.sizes.h5.num + fonts.baseSize.num,
					minSize: Math.max(
						fonts.baseSize.num * fonts.sizes.h5.num * 0.7,
						fonts.baseSize.num * 1.1
					),
					maxViewport: breaks.ldesk.num,
					minViewport: breaks.tablet.num * 0.7,
				})}
      }
    }
    h6 {
      font-size: ${fonts.sizes.h6.em};
      &.fluid {
        ${fluidFontSize({
					maxSize: fonts.baseSize.num * fonts.sizes.h6.num + fonts.baseSize.num,
					minSize: Math.max(
						fonts.baseSize.num * fonts.sizes.h6.num * 0.7,
						fonts.baseSize.num * 1.1
					),
					maxViewport: breaks.ldesk.num,
					minViewport: breaks.tablet.num * 0.7,
				})}
      }
      font-weight: bold;
    }

    .flex {
      display: flex;
      &.center {
        align-items: center;
        justify-content: center;
      }
    }
    .flex-tablet {
      ${media.tablet} {
        display: flex;
        &.center {
          align-items: center;
          justify-content: center;
        }
      }
    }
    .flex-desk {
      ${media.sdesk} {
        display: flex;
        &.center {
          align-items: center;
          justify-content: center;
        }
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
      background-color: ${colors.bg.tint(8)};
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
      color: ${colors.secondary.val};
      &:hover, &:active {
        color: ${colors.secondary.calc().brighten(10).toString()};
        border-color: ${colors.secondary.calc().brighten(10).toString()};
      }
    }

    button {
      &:active {
        border-style: solid;
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

    ${swfUICss ? swfUICss : ''}
    ${global ? global : ''}
    ${projectCSS ? projectCSS : ''}
  `
	return createGlobalStyle`${styles}`
}
