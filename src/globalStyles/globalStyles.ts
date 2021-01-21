import reset from 'styled-reset'
import { Theme } from '../lib/theme'
import { fluidHeadingSizes } from './hTags'
import { milligram } from './milligram'

export type CreateThemeGlobalStyleOptions = {
	include?: {
		fluidHeadings?: boolean
		cssReset?: boolean
		milligram?: boolean
	}
}
export const createThemeGlobalStyles = (
	theme: Theme,
	options?: CreateThemeGlobalStyleOptions
): string => {
	return `
  ${options?.include?.cssReset !== false ? reset : ''}
  ${options?.include?.milligram ? milligram : ''}

  html {
    background-color: ${theme.colors.white.val};
  }
  body {
    color: ${theme.colors.text.val};
    font-size: ${theme.sizes.font.base.val};
    font-family: ${theme.fonts.textFamily};
  }

  p,span,button,a,ul,li,textarea,input,blockquote,pre,div,aside,nav,header,footer,cite,section,ol {
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
  }
  
  div,ul,li,a,p,h1,h2,h3,h4,h5,h6,pre,blockquote,cite,header,footer,main,body,section,aside {
    position: relative;
  }

  p,div,h1,h2,h3,h4,h5,h6,section,aside,header,footer,blockquote,ul,ol,nav {
    display: block;
    box-sizing: border-box;
  }

  p {
    margin: 0.5em 0;
  }
  
  a {
    color: ${theme.colors.secondary.val};
    text-decoration: none;
    &:hover {
      color: ${theme.colors.secondary.bright(0).val};
    }
  }

  em, i {
    font-style: italic;
  }

  strong {
    font-weight: bolder;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.titleFamily};
  }

  ${options?.include?.fluidHeadings ? fluidHeadingSizes(theme) : ''}

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
    background-color: ${theme.colors.black.tint(8)};
  }

  button, a, input, textarea {
    outline: none;
    box-sizing: border-box;
    box-shadow: none;
    background: none;
    border-color: inherit;

    transition: all ${theme.times.tranS};

    &:hover, &:focus {
      outline: none;
    }
    &:hover {
      cursor: pointer;
    }
    
    &:disabled {
      color: ${theme.colors.disabled.val};
      border-color: ${theme.colors.disabled.val};
      fill: ${theme.colors.disabled.val};
      &:hover, &:focus {
        color: ${theme.colors.disabled.val};
        border-color: ${theme.colors.disabled.val};
        fill: ${theme.colors.disabled.val};
      }
      &:hover {
        cursor: default;
      }
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

  /* Column layout classes */
  .cols {
    display: flex;
    width: 100%;
    align-items: stretch;
    &.cols-tablet {
      display: block;
      width: auto;
      ${theme.media.tablet} {
        display: flex;
        width: 100%;
      }
    }
    &.cols-sdesk {
      display: block;
      width: auto;
      ${theme.media.sdesk} {
        display: flex;
        width: 100%;
      }
    }
    & > *{
      flex-grow: 1;
    }
  }

  /* Flex utilities */
  .flex {
		display: flex;
	}
	.flex-tablet {
		${theme.media.sdesk} {
			display: flex;
		}
	}
	.flex-desk {
		${theme.media.sdesk} {
			display: flex;
		}
	}
`
}
