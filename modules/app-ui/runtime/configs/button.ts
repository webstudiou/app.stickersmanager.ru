import icons from './icons'
import fonts from './fonts'
import rounded from './rounded'
import sizes from './sizes'

export default {
  ...icons,
  ...fonts,
  ...rounded,
  ...sizes,
  wrapper: 'relative',
  fluid: 'w-full',
  contents: 'flex-none items-center gap-2.5 border border-solid border-transparent text-center align-top relative inline-flex justify-center overflow-hidden transition ease-in-out disabled:pointer-events-none',
  color: {
    blue: {
      solid: 'bg-blue text-white',
      bezeled: 'bg-blue/15 text-blue hover:bg-blue hover:text-white',
      outline: 'bg-transparent !border-blue text-blue',
    },
    red: {
      solid: 'bg-red text-white',
      bezeled: 'bg-red/15 text-red hover:bg-red hover:text-white',
      outline: 'bg-transparent !border-red text-red',
    },
    orange: {
      solid: 'bg-orange text-white',
      bezeled: 'bg-orange/15 text-orange hover:bg-orange hover:text-white',
      outline: 'bg-transparent !border-orange text-orange',
    },
    yellow: {
      solid: 'bg-yellow text-white',
      bezeled: 'bg-yellow/15 text-yellow hover:bg-yellow hover:text-white',
      outline: 'bg-transparent !border-yellow text-yellow',
    },
    green: {
      solid: 'bg-green text-white',
      bezeled: 'bg-green/15 text-green hover:bg-green hover:text-white',
      outline: 'bg-transparent !border-green text-green',
    },
    mint: {
      solid: 'bg-mint text-white',
      bezeled: 'bg-mint/15 text-mint hover:bg-mint hover:text-white',
      outline: 'bg-transparent !border-mint text-mint',
    },
    teal: {
      solid: 'bg-teal text-white',
      bezeled: 'bg-teal/15 text-teal hover:bg-teal hover:text-white',
      outline: 'bg-transparent !border-teal text-teal',
    },
    cyan: {
      solid: 'bg-cyan text-white',
      bezeled: 'bg-cyan/15 text-cyan hover:bg-cyan hover:text-white',
      outline: 'bg-transparent !border-cyan text-cyan',
    },
    indigo: {
      solid: 'bg-indigo text-white',
      bezeled: 'bg-indigo/15 text-indigo hover:bg-indigo hover:text-white',
      outline: 'bg-transparent !border-indigo text-indigo',
    },
    purple: {
      solid: 'bg-purple text-white',
      bezeled: 'bg-purple/15 text-purple hover:bg-purple hover:text-white',
      outline: 'bg-transparent !border-purple text-purple',
    },
    pink: {
      solid: 'bg-pink text-white',
      bezeled: 'bg-pink/15 text-pink hover:bg-pink hover:text-white',
      outline: 'bg-transparent !border-pink text-pink',
    },
    primary: {
      solid: 'bg-primary text-white',
      bezeled: 'bg-primary/15 text-primary hover:bg-primary hover:text-white',
      outline: 'bg-transparent !border-primary text-primary',
    },
    danger: {
      solid: 'bg-danger text-white',
      bezeled: 'bg-danger/15 text-danger hover:bg-danger hover:text-white',
      outline: 'bg-transparent !border-danger text-danger',
    },
    success: {
      solid: 'bg-success text-white',
      bezeled: 'bg-success/15 text-success hover:bg-success hover:text-white',
      outline: 'bg-transparent !border-success text-success',
    },
    warning: {
      solid: 'bg-warning text-white',
      bezeled: 'bg-warning/15 text-warning hover:bg-warning hover:text-white',
      outline: 'bg-transparent !border-warning text-warning',
    },
    input: {
      solid: 'bg-gray-6',
      bezeled: 'bg-gray-6/15 bg-gray-6 text-labels-primary/50 hover:bg-gray-6 hover:text-labels-primary',
      outline: 'bg-transparent !border-gray-6 text-gray-6',
    },
    transparent: {
      solid: 'bg-transparent text-inherit',
      bezeled: 'bg-transparent text-inherit',
      outline: 'bg-transparent !border-transparent text-inherit',
    },
  },
  iconsWrapper: 'inline-flex',
  loader: 'absolute w-full h-full left-0 top-0 flex flex-center',
  variant: 'bg-{color} text-{color}',
}
