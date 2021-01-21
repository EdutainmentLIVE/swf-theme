import { Theme } from '../lib/theme'

export const fluidHeadingSizes = (theme: Theme): string => `
  h1 {
    font-size: ${theme.sizes.font.h1.val};
    &.fluid {
      ${theme.fonts.fluidFontSize({
				maxSize: theme.sizes.font.base.num * theme.sizes.font.h1.num + theme.sizes.font.base.num,
				minSize: Math.max(
					theme.sizes.font.base.num * theme.sizes.font.h1.num * 0.7,
					theme.sizes.font.base.num * 1.1
				),
				maxViewport: theme.breaks.ldesk.num,
				minViewport: theme.breaks.tablet.num * 0.7,
			})}
    }
  }
  h2 {
    font-size: ${theme.sizes.font.h2.val};
    &.fluid {
      ${theme.fonts.fluidFontSize({
				maxSize: theme.sizes.font.base.num * theme.sizes.font.h2.num + theme.sizes.font.base.num,
				minSize: Math.max(
					theme.sizes.font.base.num * theme.sizes.font.h2.num * 0.7,
					theme.sizes.font.base.num * 1.1
				),
				maxViewport: theme.breaks.ldesk.num,
				minViewport: theme.breaks.tablet.num * 0.7,
			})}
    }
  }
  h3 {
    font-size: ${theme.sizes.font.h3.val};
    &.fluid {
      ${theme.fonts.fluidFontSize({
				maxSize: theme.sizes.font.base.num * theme.sizes.font.h3.num + theme.sizes.font.base.num,
				minSize: Math.max(
					theme.sizes.font.base.num * theme.sizes.font.h3.num * 0.7,
					theme.sizes.font.base.num * 1.1
				),
				maxViewport: theme.breaks.ldesk.num,
				minViewport: theme.breaks.tablet.num * 0.7,
			})}
    }
  }
  h4 {
    font-size: ${theme.sizes.font.h4.val};
    &.fluid {
      ${theme.fonts.fluidFontSize({
				maxSize: theme.sizes.font.base.num * theme.sizes.font.h4.num + theme.sizes.font.base.num,
				minSize: Math.max(
					theme.sizes.font.base.num * theme.sizes.font.h4.num * 0.7,
					theme.sizes.font.base.num * 1.1
				),
				maxViewport: theme.breaks.ldesk.num,
				minViewport: theme.breaks.tablet.num * 0.7,
			})}
    }
  }
  h5 {
    font-size: ${theme.sizes.font.h5.val};
    &.fluid {
      ${theme.fonts.fluidFontSize({
				maxSize: theme.sizes.font.base.num * theme.sizes.font.h5.num + theme.sizes.font.base.num,
				minSize: Math.max(
					theme.sizes.font.base.num * theme.sizes.font.h5.num * 0.7,
					theme.sizes.font.base.num * 1.1
				),
				maxViewport: theme.breaks.ldesk.num,
				minViewport: theme.breaks.tablet.num * 0.7,
			})}
    }
  }
  h6 {
    font-size: ${theme.sizes.font.h6.val};
    &.fluid {
      ${theme.fonts.fluidFontSize({
				maxSize: theme.sizes.font.base.num * theme.sizes.font.h6.num + theme.sizes.font.base.num,
				minSize: Math.max(
					theme.sizes.font.base.num * theme.sizes.font.h6.num * 0.7,
					theme.sizes.font.base.num * 1.1
				),
				maxViewport: theme.breaks.ldesk.num,
				minViewport: theme.breaks.tablet.num * 0.7,
			})}
    }
  }
`
