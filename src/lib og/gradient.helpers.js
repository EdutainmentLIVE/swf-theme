export const vertGradient = ({ from = 'rgba(0,0,0,0.65)', to = 'rgba(0,0,0,0)', scale = '0%' }) => `
  background: linear-gradient(to bottom,  ${from} ${scale},${to} 100%);
`

export const horizGradient = ({ from = 'rgba(0,0,0,0.65)', to = 'rgba(0,0,0,0)', scale = '0%' }) => `
  background: linear-gradient(to right,  ${from} ${scale},${to} 100%);
`