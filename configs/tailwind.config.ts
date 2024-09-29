import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'

export default {
  content: [
    'modules/app-ui/runtime/components/**/*.{vue,js,ts}',
    'modules/app-ui/runtime/composables/**/*.{js,ts}',
    'modules/app-ui/runtime/plugins/**/*.{js,ts}',
    'modules/app-ui/runtime/utils/**/*.{js,ts}',
    'modules/app-ui/runtime/configs/**/*.{mjs,js,ts}',

    'components/**/*.{vue,js,ts}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'composables/**/*.{js,ts}',
    'plugins/**/*.{js,ts}',
    'utils/**/*.{js,ts}',

    'App.{js,ts,vue}',
    'app.{js,ts,vue}',
    'Error.{js,ts,vue}',
    'error.{js,ts,vue}',
    'app.config.{js,ts}',
  ],
  presets: [],
  darkMode: 'class',
  theme: {
    accentColor: ({ theme }) => ({
      ...theme('colors'),
      auto: 'auto',
    }),
    animation: {
      none: 'none',
      // spin: 'spin 1s linear infinite',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      // bounce: 'bounce 1s infinite',
    },
    aria: {
      busy: 'busy="true"',
      checked: 'checked="true"',
      disabled: 'disabled="true"',
      expanded: 'expanded="true"',
      hidden: 'hidden="true"',
      pressed: 'pressed="true"',
      readonly: 'readonly="true"',
      required: 'required="true"',
      selected: 'selected="true"',
    },
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
    },
    backdropBlur: ({ theme }) => theme('blur'),
    backdropBrightness: ({ theme }) => theme('brightness'),
    backdropContrast: ({ theme }) => theme('contrast'),
    backdropGrayscale: ({ theme }) => theme('grayscale'),
    backdropHueRotate: ({ theme }) => theme('hueRotate'),
    backdropInvert: ({ theme }) => theme('invert'),
    backdropOpacity: ({ theme }) => theme('opacity'),
    backdropSaturate: ({ theme }) => theme('saturate'),
    backdropSepia: ({ theme }) => theme('sepia'),
    backgroundColor: ({ theme }) => theme('colors'),
    backgroundImage: {
      'none': 'none',
      'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
      'gradient-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
      'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
      'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      'gradient-to-bl': 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
      'gradient-to-l': 'linear-gradient(to left, var(--tw-gradient-stops))',
      'gradient-to-tl': 'linear-gradient(to top left, var(--tw-gradient-stops))',
    },
    backgroundOpacity: ({ theme }) => theme('opacity'),
    backgroundPosition: {
      'bottom': 'bottom',
      'center': 'center',
      'left': 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      'right': 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      'top': 'top',
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
    },
    blur: {
      0: '0',
      none: '',
      /* sm: '4px', */
      DEFAULT: '5px',
      /* md: '12px',
      lg: '16px',
      xl: '24px',
      '2xl': '40px',
      '3xl': '64px', */
    },
    borderColor: ({ theme }) => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray-1', 'currentColor'),
    }),
    borderOpacity: ({ theme }) => theme('opacity'),
    borderRadius: {
      none: '0px',
      xs: '0.2rem',
      sm: '0.375rem',
      DEFAULT: '0.625rem',
      md: '0.625rem',
      lg: '0.8rem',
      xl: '0.925rem',
      full: '9999px',
      inherit: 'inherit',
    },
    borderSpacing: ({ theme }) => ({
      ...theme('spacing'),
    }),
    borderWidth: {
      DEFAULT: '1px',
      0: '0px',
      2: '2px',
    },
    boxShadow: {
      /* sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)', */
      DEFAULT: '0px 0px 50px 0px rgba(82, 63, 105, 0.15)',
      toasts: '0 10px 30px -5px rgba(0, 0, 0, 0.05);',
      /* md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)', */
      none: 'none',
    },
    /* boxShadowColor: ({ theme }) => theme('colors'), */
    brightness: {
      0: '0',
      50: '.5',
      75: '.75',
      90: '.9',
      95: '.95',
      100: '1',
      105: '1.05',
      110: '1.1',
      125: '1.25',
      150: '1.5',
      200: '2',
    },
    caretColor: ({ theme }) => theme('colors'),
    colors: ({ colors }) => ({
      'inherit': colors.inherit,
      'current': colors.current,
      'transparent': colors.transparent,
      'black': colors.black,
      'white': colors.white,
      'backgrounds-master': 'rgb(var(--color-backgrounds-master))',
      'backgrounds-primary': 'rgb(var(--color-backgrounds-primary))',
      'backgrounds-secondary': 'rgb(var(--color-backgrounds-secondary))',
      'backgrounds-tertiary': 'rgb(var(--color-backgrounds-tertiary))',
      'separators-opaque': 'rgb(var(--color-separators-opaque) / <alpha-value>)',
      'separators-non-opaque': 'rgb(var(--color-separators-non-opaque) / var(--separators-alpha))',

      'labels-primary': 'rgb(var(--color-labels-primary) / <alpha-value>)',
      'labels-secondary': 'rgb(var(--color-labels-secondary) / 60%)',
      'labels-tertiary': 'rgb(var(--color-labels-tertiary) / 30%)',
      'labels-quarternary': 'rgb(var(--color-labels-quarternary) / var(--labels-quarternary-alpha))',

      'muted': 'rgb(var(--color-gray-1))',

      'red': {
        DEFAULT: 'rgb(var(--color-red-DEFAULT))',
        50: 'rgb(var(--color-red-50))',
        100: 'rgb(var(--color-red-100))',
        200: 'rgb(var(--color-red-200))',
        300: 'rgb(var(--color-red-300))',
        400: 'rgb(var(--color-red-400))',
        500: 'rgb(var(--color-red-500))',
        600: 'rgb(var(--color-red-600))',
        700: 'rgb(var(--color-red-700))',
        800: 'rgb(var(--color-red-800))',
        900: 'rgb(var(--color-red-900))',
        950: 'rgb(var(--color-red-950))',
      },
      'orange': {
        DEFAULT: 'rgb(var(--color-orange-DEFAULT))',
        50: 'rgb(var(--color-orange-50))',
        100: 'rgb(var(--color-orange-100))',
        200: 'rgb(var(--color-orange-200))',
        300: 'rgb(var(--color-orange-300))',
        400: 'rgb(var(--color-orange-400))',
        500: 'rgb(var(--color-orange-500))',
        600: 'rgb(var(--color-orange-600))',
        700: 'rgb(var(--color-orange-700))',
        800: 'rgb(var(--color-orange-800))',
        900: 'rgb(var(--color-orange-900))',
        950: 'rgb(var(--color-orange-950))',
      },
      'yellow': {
        DEFAULT: 'rgb(var(--color-yellow-DEFAULT))',
        50: 'rgb(var(--color-yellow-50))',
        100: 'rgb(var(--color-yellow-100))',
        200: 'rgb(var(--color-yellow-200))',
        300: 'rgb(var(--color-yellow-300))',
        400: 'rgb(var(--color-yellow-400))',
        500: 'rgb(var(--color-yellow-500))',
        600: 'rgb(var(--color-yellow-600))',
        700: 'rgb(var(--color-yellow-700))',
        800: 'rgb(var(--color-yellow-800))',
        900: 'rgb(var(--color-yellow-900))',
        950: 'rgb(var(--color-yellow-950))',
      },
      'green': {
        DEFAULT: 'rgb(var(--color-green-DEFAULT))',
        50: 'rgb(var(--color-green-50))',
        100: 'rgb(var(--color-green-100))',
        200: 'rgb(var(--color-green-200))',
        300: 'rgb(var(--color-green-300))',
        400: 'rgb(var(--color-green-400))',
        500: 'rgb(var(--color-green-500))',
        600: 'rgb(var(--color-green-600))',
        700: 'rgb(var(--color-green-700))',
        800: 'rgb(var(--color-green-800))',
        900: 'rgb(var(--color-green-900))',
        950: 'rgb(var(--color-green-950))',
      },
      'mint': {
        DEFAULT: 'rgb(var(--color-mint-DEFAULT))',
        50: 'rgb(var(--color-mint-50))',
        100: 'rgb(var(--color-mint-100))',
        200: 'rgb(var(--color-mint-200))',
        300: 'rgb(var(--color-mint-300))',
        400: 'rgb(var(--color-mint-400))',
        500: 'rgb(var(--color-mint-500))',
        600: 'rgb(var(--color-mint-600))',
        700: 'rgb(var(--color-mint-700))',
        800: 'rgb(var(--color-mint-800))',
        900: 'rgb(var(--color-mint-900))',
        950: 'rgb(var(--color-mint-950))',
      },
      'teal': {
        DEFAULT: 'rgb(var(--color-teal-DEFAULT))',
        50: 'rgb(var(--color-teal-50))',
        100: 'rgb(var(--color-teal-100))',
        200: 'rgb(var(--color-teal-200))',
        300: 'rgb(var(--color-teal-300))',
        400: 'rgb(var(--color-teal-400))',
        500: 'rgb(var(--color-teal-500))',
        600: 'rgb(var(--color-teal-600))',
        700: 'rgb(var(--color-teal-700))',
        800: 'rgb(var(--color-teal-800))',
        900: 'rgb(var(--color-teal-900))',
        950: 'rgb(var(--color-teal-950))',
      },
      'cyan': {
        DEFAULT: 'rgb(var(--color-cyan-DEFAULT))',
        50: 'rgb(var(--color-cyan-50))',
        100: 'rgb(var(--color-cyan-100))',
        200: 'rgb(var(--color-cyan-200))',
        300: 'rgb(var(--color-cyan-300))',
        400: 'rgb(var(--color-cyan-400))',
        500: 'rgb(var(--color-cyan-500))',
        600: 'rgb(var(--color-cyan-600))',
        700: 'rgb(var(--color-cyan-700))',
        800: 'rgb(var(--color-cyan-800))',
        900: 'rgb(var(--color-cyan-900))',
        950: 'rgb(var(--color-cyan-950))',
      },
      'blue': {
        DEFAULT: 'rgb(var(--color-blue-DEFAULT))',
        50: 'rgb(var(--color-blue-50))',
        100: 'rgb(var(--color-blue-100))',
        200: 'rgb(var(--color-blue-200))',
        300: 'rgb(var(--color-blue-300))',
        400: 'rgb(var(--color-blue-400))',
        500: 'rgb(var(--color-blue-500))',
        600: 'rgb(var(--color-blue-600))',
        700: 'rgb(var(--color-blue-700))',
        800: 'rgb(var(--color-blue-800))',
        900: 'rgb(var(--color-blue-900))',
        950: 'rgb(var(--color-blue-950))',
      },
      'indigo': {
        DEFAULT: 'rgb(var(--color-indigo-DEFAULT))',
        50: 'rgb(var(--color-indigo-50))',
        100: 'rgb(var(--color-indigo-100))',
        200: 'rgb(var(--color-indigo-200))',
        300: 'rgb(var(--color-indigo-300))',
        400: 'rgb(var(--color-indigo-400))',
        500: 'rgb(var(--color-indigo-500))',
        600: 'rgb(var(--color-indigo-600))',
        700: 'rgb(var(--color-indigo-700))',
        800: 'rgb(var(--color-indigo-800))',
        900: 'rgb(var(--color-indigo-900))',
        950: 'rgb(var(--color-indigo-950))',
      },
      'purple': {
        DEFAULT: 'rgb(var(--color-purple-DEFAULT))',
        50: 'rgb(var(--color-purple-50))',
        100: 'rgb(var(--color-purple-100))',
        200: 'rgb(var(--color-purple-200))',
        300: 'rgb(var(--color-purple-300))',
        400: 'rgb(var(--color-purple-400))',
        500: 'rgb(var(--color-purple-500))',
        600: 'rgb(var(--color-purple-600))',
        700: 'rgb(var(--color-purple-700))',
        800: 'rgb(var(--color-purple-800))',
        900: 'rgb(var(--color-purple-900))',
        950: 'rgb(var(--color-purple-950))',
      },
      'pink': {
        DEFAULT: 'rgb(var(--color-pink-DEFAULT))',
        50: 'rgb(var(--color-pink-50))',
        100: 'rgb(var(--color-pink-100))',
        200: 'rgb(var(--color-pink-200))',
        300: 'rgb(var(--color-pink-300))',
        400: 'rgb(var(--color-pink-400))',
        500: 'rgb(var(--color-pink-500))',
        600: 'rgb(var(--color-pink-600))',
        700: 'rgb(var(--color-pink-700))',
        800: 'rgb(var(--color-pink-800))',
        900: 'rgb(var(--color-pink-900))',
        950: 'rgb(var(--color-pink-950))',
      },
      'gray': {
        DEFAULT: 'rgb(var(--color-gray-DEFAULT))',
        1: 'rgb(var(--color-gray-1))',
        2: 'rgb(var(--color-gray-2))',
        3: 'rgb(var(--color-gray-3))',
        4: 'rgb(var(--color-gray-4))',
        5: 'rgb(var(--color-gray-5))',
        6: 'rgb(var(--color-gray-6))',
      },

      'primary': {
        DEFAULT: 'rgb(var(--color-primary-DEFAULT))',
        50: 'rgb(var(--color-primary-50))',
        100: 'rgb(var(--color-primary-100))',
        200: 'rgb(var(--color-primary-200))',
        300: 'rgb(var(--color-primary-300))',
        400: 'rgb(var(--color-primary-400))',
        500: 'rgb(var(--color-primary-500))',
        600: 'rgb(var(--color-primary-600))',
        700: 'rgb(var(--color-primary-700))',
        800: 'rgb(var(--color-primary-800))',
        900: 'rgb(var(--color-primary-900))',
        950: 'rgb(var(--color-primary-950))',
      },
      'danger': {
        DEFAULT: 'rgb(var(--color-red-DEFAULT))',
        50: 'rgb(var(--color-red-50))',
        100: 'rgb(var(--color-red-100))',
        200: 'rgb(var(--color-red-200))',
        300: 'rgb(var(--color-red-300))',
        400: 'rgb(var(--color-red-400))',
        500: 'rgb(var(--color-red-500))',
        600: 'rgb(var(--color-red-600))',
        700: 'rgb(var(--color-red-700))',
        800: 'rgb(var(--color-red-800))',
        900: 'rgb(var(--color-red-900))',
        950: 'rgb(var(--color-red-950))',
      },
      'warning': {
        DEFAULT: 'rgb(var(--color-orange-DEFAULT))',
        50: 'rgb(var(--color-orange-50))',
        100: 'rgb(var(--color-orange-100))',
        200: 'rgb(var(--color-orange-200))',
        300: 'rgb(var(--color-orange-300))',
        400: 'rgb(var(--color-orange-400))',
        500: 'rgb(var(--color-orange-500))',
        600: 'rgb(var(--color-orange-600))',
        700: 'rgb(var(--color-orange-700))',
        800: 'rgb(var(--color-orange-800))',
        900: 'rgb(var(--color-orange-900))',
        950: 'rgb(var(--color-orange-950))',
      },
      'success': {
        DEFAULT: 'rgb(var(--color-green-DEFAULT))',
        50: 'rgb(var(--color-green-50))',
        100: 'rgb(var(--color-green-100))',
        200: 'rgb(var(--color-green-200))',
        300: 'rgb(var(--color-green-300))',
        400: 'rgb(var(--color-green-400))',
        500: 'rgb(var(--color-green-500))',
        600: 'rgb(var(--color-green-600))',
        700: 'rgb(var(--color-green-700))',
        800: 'rgb(var(--color-green-800))',
        900: 'rgb(var(--color-green-900))',
        950: 'rgb(var(--color-green-950))',
      },
    }),
    columns: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      /* '3xs': '16rem',
      '2xs': '18rem',
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      '7xl': '80rem', */
    },
    container: {},
    content: {
      none: 'none',
      alternates: '\'\'',
    },
    contrast: {
      0: '0',
      50: '.5',
      75: '.75',
      100: '1',
      125: '1.25',
      150: '1.5',
      200: '2',
    },
    cursor: {
      'auto': 'auto',
      'default': 'default',
      'pointer': 'pointer',
      'wait': 'wait',
      'text': 'text',
      'move': 'move',
      'help': 'help',
      'not-allowed': 'not-allowed',
      'none': 'none',
      'context-menu': 'context-menu',
      'progress': 'progress',
      'cell': 'cell',
      'crosshair': 'crosshair',
      'vertical-text': 'vertical-text',
      'alias': 'alias',
      'copy': 'copy',
      'no-drop': 'no-drop',
      'grab': 'grab',
      'grabbing': 'grabbing',
      'all-scroll': 'all-scroll',
      'col-resize': 'col-resize',
      'row-resize': 'row-resize',
      'n-resize': 'n-resize',
      'e-resize': 'e-resize',
      's-resize': 's-resize',
      'w-resize': 'w-resize',
      'ne-resize': 'ne-resize',
      'nw-resize': 'nw-resize',
      'se-resize': 'se-resize',
      'sw-resize': 'sw-resize',
      'ew-resize': 'ew-resize',
      'ns-resize': 'ns-resize',
      'nesw-resize': 'nesw-resize',
      'nwse-resize': 'nwse-resize',
      'zoom-in': 'zoom-in',
      'zoom-out': 'zoom-out',
    },
    divideColor: ({ theme }) => theme('borderColor'),
    divideOpacity: ({ theme }) => theme('borderOpacity'),
    divideWidth: ({ theme }) => theme('borderWidth'),
    dropShadow: {
      /* sm: '0 1px 1px rgb(0 0 0 / 0.05)', */
      DEFAULT: ['0 10px 8px rgb(0 0 0 / 0.04)', '0 4px 3px rgb(0 0 0 / 0.1)'],
      /* md: ['0 4px 3px rgb(0 0 0 / 0.07)', '0 2px 2px rgb(0 0 0 / 0.06)'],
      lg: ['0 10px 8px rgb(0 0 0 / 0.04)', '0 4px 3px rgb(0 0 0 / 0.1)'],
      xl: ['0 20px 13px rgb(0 0 0 / 0.03)', '0 8px 5px rgb(0 0 0 / 0.08)'],
      '2xl': '0 25px 25px rgb(0 0 0 / 0.15)', */
      none: '0 0 #0000',
    },
    fill: ({ theme }) => ({
      none: 'none',
      ...theme('colors'),
    }),
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      /* initial: '0 1 auto', */
      zero: '0 0 auto',
      none: 'none',
    },
    flexBasis: ({ theme }) => ({
      'auto': 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      'full': '100%',
    }),
    flexGrow: {
      0: '0',
      DEFAULT: '1',
    },
    flexShrink: {
      0: '0',
      DEFAULT: '1',
    },
    fontFamily: {
      sans: ['SF Pro Display', 'ui-sans-serif', 'system-ui', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      serif: ['SF Pro Text', 'ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
    },
    fontSize: {
      base: ['0.875rem', { lineHeight: '1.375rem' }],

      title1: ['1.8125rem', { lineHeight: '2.125rem' }],
      title2: ['1.6875rem', { lineHeight: '2rem' }],
      title3: ['1.5625rem', { lineHeight: '1.875rem' }],
      title4: ['1.4375rem', { lineHeight: '1.75rem' }],
      title5: ['1.3125rem', { lineHeight: '1.625rem' }],
      title6: ['1.1875rem', { lineHeight: '1.5rem' }],

      headline: ['1.0625rem', { lineHeight: '1.375rem' }],
      subheadline: ['0.9375rem', { lineHeight: '1.375rem' }],

      footnote: ['0.8125rem', { lineHeight: '1.125rem' }],
      callout: ['0.6875rem', { lineHeight: '1rem' }],

      caption1: ['0.6125rem', { lineHeight: '0.875rem' }],
      caption2: ['0.5375rem', { lineHeight: '0.75rem' }],

      xs: ['0.625rem', { lineHeight: '1' }],
      sm: ['0.75rem', { lineHeight: '1' }],
      md: ['0.875rem', { lineHeight: '1' }],
      lg: ['1rem', { lineHeight: '1' }],
      xl: ['1.125rem', { lineHeight: '1' }],
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    gap: ({ theme }) => theme('spacing'),
    gradientColorStops: ({ theme }) => theme('colors'),
    gradientColorStopPositions: {
      '0%': '0%',
      '5%': '5%',
      '10%': '10%',
      '15%': '15%',
      '20%': '20%',
      '25%': '25%',
      '30%': '30%',
      '35%': '35%',
      '40%': '40%',
      '45%': '45%',
      '50%': '50%',
      '55%': '55%',
      '60%': '60%',
      '65%': '65%',
      '70%': '70%',
      '75%': '75%',
      '80%': '80%',
      '85%': '85%',
      '90%': '90%',
      '95%': '95%',
      '100%': '100%',
    },
    grayscale: {
      0: '0',
      DEFAULT: '100%',
    },
    gridAutoColumns: {
      auto: 'auto',
      min: 'min-content',
      max: 'max-content',
      fr: 'minmax(0, 1fr)',
    },
    gridAutoRows: {
      auto: 'auto',
      min: 'min-content',
      max: 'max-content',
      fr: 'minmax(0, 1fr)',
    },
    gridColumn: {
      'auto': 'auto',
      'span-1': 'span 1 / span 1',
      'span-2': 'span 2 / span 2',
      'span-3': 'span 3 / span 3',
      'span-4': 'span 4 / span 4',
      'span-5': 'span 5 / span 5',
      'span-6': 'span 6 / span 6',
      'span-7': 'span 7 / span 7',
      'span-8': 'span 8 / span 8',
      'span-9': 'span 9 / span 9',
      'span-10': 'span 10 / span 10',
      'span-11': 'span 11 / span 11',
      'span-12': 'span 12 / span 12',
      'span-full': '1 / -1',
    },
    gridColumnEnd: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
    },
    gridColumnStart: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
    },
    gridRow: {
      'auto': 'auto',
      'span-1': 'span 1 / span 1',
      'span-2': 'span 2 / span 2',
      'span-3': 'span 3 / span 3',
      'span-4': 'span 4 / span 4',
      'span-5': 'span 5 / span 5',
      'span-6': 'span 6 / span 6',
      'span-7': 'span 7 / span 7',
      'span-8': 'span 8 / span 8',
      'span-9': 'span 9 / span 9',
      'span-10': 'span 10 / span 10',
      'span-11': 'span 11 / span 11',
      'span-12': 'span 12 / span 12',
      'span-full': '1 / -1',
    },
    gridRowEnd: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
    },
    gridRowStart: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
    },
    gridTemplateColumns: {
      none: 'none',
      subgrid: 'subgrid',
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
      7: 'repeat(7, minmax(0, 1fr))',
      8: 'repeat(8, minmax(0, 1fr))',
      9: 'repeat(9, minmax(0, 1fr))',
      10: 'repeat(10, minmax(0, 1fr))',
      11: 'repeat(11, minmax(0, 1fr))',
      12: 'repeat(12, minmax(0, 1fr))',
    },
    gridTemplateRows: {
      none: 'none',
      subgrid: 'subgrid',
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
      7: 'repeat(7, minmax(0, 1fr))',
      8: 'repeat(8, minmax(0, 1fr))',
      9: 'repeat(9, minmax(0, 1fr))',
      10: 'repeat(10, minmax(0, 1fr))',
      11: 'repeat(11, minmax(0, 1fr))',
      12: 'repeat(12, minmax(0, 1fr))',
    },
    height: ({ theme }) => ({
      'auto': 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      'full': '100%',
      /* screen: '100vh',
       svh: '100svh',
       lvh: '100lvh',
       dvh: '100dvh',
       min: 'min-content',
       max: 'max-content', */
      'fit': 'fit-content',
    }),
    hueRotate: {
      0: '0deg',
      15: '15deg',
      30: '30deg',
      60: '60deg',
      90: '90deg',
      180: '180deg',
    },
    inset: ({ theme }) => ({
      'auto': 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      'full': '100%',
    }),
    invert: {
      0: '0',
      DEFAULT: '100%',
    },
    keyframes: {
      /* spin: {
        to: {
          transform: 'rotate(360deg)',
        },
      }, */
      ping: {
        '75%, 100%': {
          transform: 'scale(2)',
          opacity: '0',
        },
      },
      pulse: {
        '50%': {
          opacity: '.5',
        },
      },
      /* bounce: {
        '0%, 100%': {
          transform: 'translateY(-25%)',
          animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
        },
        '50%': {
          transform: 'none',
          animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
        },
      }, */
    },
    letterSpacing: {
      /* tighter: '-0.05em',
       tight: '-0.025em', */
      normal: '0em',
      /* wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em', */
    },
    lineHeight: {
      none: '1',
      /* tight: '1.25',
      snug: '1.375', */
      normal: '1.5',
      /* relaxed: '1.625',
      loose: '2', */
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
    },
    listStyleImage: {
      none: 'none',
    },
    margin: ({ theme }) => ({
      auto: 'auto',
      ...theme('spacing'),
    }),
    lineClamp: {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
    },
    maxHeight: ({ theme }) => ({
      ...theme('spacing'),
      none: 'none',
      full: '100%',
      /* screen: '100vh',
      svh: '100svh',
      lvh: '100lvh',
      dvh: '100dvh',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content', */
    }),
    maxWidth: ({ theme, breakpoints }) => ({
      ...theme('spacing'),
      none: 'none',
      /* xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      '7xl': '80rem', */
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      /* fit: 'fit-content',
      prose: '65ch', */
      ...breakpoints(theme('screens')),
    }),
    minHeight: ({ theme }) => ({
      ...theme('spacing'),
      full: '100%',
      /* screen: '100vh',
      svh: '100svh',
      lvh: '100lvh',
      dvh: '100dvh',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content', */
    }),
    minWidth: ({ theme }) => ({
      ...theme('spacing'),
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      /* fit: 'fit-content', */
    }),
    objectPosition: {
      'bottom': 'bottom',
      'center': 'center',
      'left': 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      'right': 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      'top': 'top',
    },
    opacity: {
      0: '0',
      5: '0.05',
      10: '0.1',
      15: '0.15',
      20: '0.2',
      25: '0.25',
      30: '0.3',
      35: '0.35',
      40: '0.4',
      45: '0.45',
      50: '0.5',
      55: '0.55',
      60: '0.6',
      65: '0.65',
      70: '0.7',
      75: '0.75',
      80: '0.8',
      85: '0.85',
      90: '0.9',
      95: '0.95',
      100: '1',
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
    },
    outlineColor: ({ theme }) => theme('colors'),
    outlineOffset: {
      0: '0px',
      1: '1px',
      /* 2: '2px',
      4: '4px',
      8: '8px', */
    },
    outlineWidth: {
      0: '0px',
      1: '1px',
      /* 2: '2px',
      4: '4px',
      8: '8px', */
    },
    padding: ({ theme }) => theme('spacing'),
    placeholderColor: ({ theme }) => theme('colors'),
    placeholderOpacity: ({ theme }) => theme('opacity'),
    ringColor: ({ theme }) => ({
      DEFAULT: theme('colors.primary.DEFAULT', '#3b82f6'),
      ...theme('colors'),
    }),
    ringOffsetColor: ({ theme }) => theme('colors'),
    ringOffsetWidth: {
      0: '0px',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
    },
    ringOpacity: ({ theme }) => ({
      DEFAULT: '0.5',
      ...theme('opacity'),
    }),
    ringWidth: {
      DEFAULT: '2px',
      0: '0px',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
    },
    rotate: {
      0: '0deg',
      45: '45deg',
      90: '90deg',
      135: '135deg',
      180: '180deg',
      225: '225deg',
      270: '270deg',
      315: '315deg',
      360: '360deg',
    },
    saturate: {
      0: '0',
      50: '.5',
      100: '1',
      150: '1.5',
      200: '2',
    },
    scale: {
      0: '0',
      25: '0.25',
      50: '.5',
      75: '.75',
      90: '.9',
      100: '1',
      125: '1.25',
      150: '1.5',
    },
    screens: {
      mobile: '640px',
      tablet: '768px',
      laptop: '1024px',
      desktop: '1280px',
      retina: '1536px',
    },
    scrollMargin: ({ theme }) => ({
      ...theme('spacing'),
    }),
    scrollPadding: ({ theme }) => theme('spacing'),
    sepia: {
      0: '0',
      DEFAULT: '100%',
    },
    skew: {
      0: '0deg',
      1: '1deg',
      2: '2deg',
      3: '3deg',
      6: '6deg',
      12: '12deg',
    },
    space: ({ theme }) => ({
      ...theme('spacing'),
    }),
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      4.5: '1.125rem',
      5: '1.25rem',
      5.5: '1.375rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      xs: '20px',
      sm: '30px',
      md: '35px',
      lg: '40px',
      xl: '45px',
    },
    stroke: ({ theme }) => ({
      none: 'none',
      ...theme('colors'),
    }),
    strokeWidth: {
      0: '0',
      1: '1',
      /* 2: '2', */
    },
    supports: {},
    data: {},
    textColor: ({ theme }) => theme('colors'),
    textDecorationColor: ({ theme }) => theme('colors'),
    textDecorationThickness: {
      'auto': 'auto',
      'from-font': 'from-font',
      '0': '0px',
      /* 1: '1px',
      2: '2px',
      4: '4px',
      8: '8px', */
    },
    textIndent: ({ theme }) => ({
      ...theme('spacing'),
    }),
    textOpacity: ({ theme }) => theme('opacity'),
    textUnderlineOffset: {
      auto: 'auto',
      0: '0px',
      /* 1: '1px',
       2: '2px',
       4: '4px',
       8: '8px', */
    },
    transformOrigin: {
      'center': 'center',
      'top': 'top',
      'top-right': 'top right',
      'right': 'right',
      'bottom-right': 'bottom right',
      'bottom': 'bottom',
      'bottom-left': 'bottom left',
      'left': 'left',
      'top-left': 'top left',
    },
    transitionDelay: {
      0: '0s',
      /* 75: '75ms', */
      100: '100ms',
      150: '150ms',
      250: '250ms',
      350: '350ms',
      500: '500ms',
      /* 700: '700ms',
      1000: '1000ms', */
    },
    transitionDuration: {
      DEFAULT: '250ms',
      0: '0s',
      /* 75: '75ms', */
      100: '100ms',
      150: '150ms',
      250: '250ms',
      350: '350ms',
      500: '500ms',
      /* 700: '700ms',
      1000: '1000ms', */
    },
    transitionProperty: {
      none: 'none',
      all: 'all',
      DEFAULT: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
      colors: 'color, background-color, border-color, text-decoration-color, fill, stroke',
      opacity: 'opacity',
      /* shadow: 'box-shadow', */
      transform: 'transform',
    },
    transitionTimingFunction: {
      'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
      'linear': 'linear',
      'in': 'cubic-bezier(0.4, 0, 1, 1)',
      'out': 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    translate: ({ theme }) => ({
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      'full': '100%',
    }),
    size: ({ theme }) => ({
      'auto': 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      'full': '100%',
      /* min: 'min-content',
      max: 'max-content',
      fit: 'fit-content', */
    }),
    width: ({ theme }) => ({
      'auto': 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      'full': '100%',
      /* screen: '100vw',
      svw: '100svw',
      lvw: '100lvw',
      dvw: '100dvw', */
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
    }),
    willChange: {
      auto: 'auto',
      scroll: 'scroll-position',
      contents: 'contents',
      transform: 'transform',
    },
    zIndex: {
      auto: 'auto',
      0: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      15: '15',
    },
  },
  plugins: [
    iconsPlugin({ collections: getIconCollections(['lucide']) }),
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: '1rem' },
      })
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.flex-center': {
          'align-items': 'center',
          'justify-content': 'center',
        },
      })
    }),
  ],
} satisfies Config
