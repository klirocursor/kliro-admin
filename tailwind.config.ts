import plugin from 'tailwindcss/plugin'
import typography from '@tailwindcss/typography'
/** @type {import('tailwindcss').Config} */

const config = {
  h1xl: {
    fontFamily: 'opensans',
    fontSize: '80px',
    fontWeight: 'semibold',
    lineHeight: '80px',
    letterSpacing: '-0.02em'
  },
  h1: {
    fontFamily: 'opensans',
    fontSize: '64px',
    fontWeight: 'semibold',
    lineHeight: '68px',
    letterSpacing: '-0.02em'
  },
  h2: {
    fontFamily: 'opensans',
    fontSize: '48px',
    fontWeight: 'medium',
    lineHeight: '54px',
    letterSpacing: '-0.01em'
  },
  h3: {
    fontFamily: 'opensans',
    fontSize: '32px',
    fontWeight: 'medium',
    lineHeight: '36px',
    letterSpacing: '0'
  },
  h4: {
    fontFamily: 'opensans',
    fontSize: '24px',
    fontWeight: 'medium',
    lineHeight: '28px',
    letterSpacing: '0'
  },
  h5: {
    fontFamily: 'opensans',
    fontSize: '18px',
    fontWeight: 'medium',
    lineHeight: '24px',
    letterSpacing: '0'
  },
  h6: {
    fontFamily: 'opensans',
    fontSize: '16px',
    fontWeight: 'medium',
    lineHeight: '24px',
    letterSpacing: '0'
  },
  small: {
    fontFamily: 'opensans',
    fontSize: '12px',
    fontWeight: 'inherit',
    lineHeight: '18px',
    letterSpacing: '0'
  },
  body: {
    fontFamily: 'opensans',
    fontSize: '14px',
    fontWeight: 'inherit',
    lineHeight: '24px',
    letterSpacing: '0'
  },
  'body-l': {
    fontFamily: 'opensans',
    fontSize: '16px',
    fontWeight: 'inherit',
    lineHeight: '24px',
    letterSpacing: '0'
  },
  'body-xl': {
    fontFamily: 'opensans',
    fontSize: '18px',
    fontWeight: 'inherit',
    lineHeight: '24px',
    letterSpacing: '0'
  },
  'body-xxl': {
    fontFamily: 'opensans',
    fontSize: '24px',
    fontWeight: 'inherit',
    lineHeight: '32px',
    letterSpacing: '0'
  },
  caption: {
    fontFamily: 'opensans',
    fontSize: '14px',
    fontWeight: 'semibold',
    lineHeight: '24px',
    letterSpacing: '0.4px',
    textTransform: 'uppercase'
  }
}

const getTypography = (theme) =>
  Object.fromEntries(
    Object.entries(config).map(([k, v]) => [
      `.typography-${k}`,
      {
        ...v,
        fontFamily: theme(`fontFamily.` + v.fontFamily),
        fontWeight: theme('fontWeight.' + v.fontWeight)
      }
    ])
  )

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        opensans: ['opensans', 'sans-serif']
      },
      rotate: {
        270: '-90deg'
      },
      colors: {
        primary: {
          DEFAULT: '#004ed1'
        },
        neutral: {
          DEFAULT: '#078CBE'
        },
        beckground: 'linear-gradient(114deg, #00D384 13.03%, #078CBE 86.69%)',
        subtitle: '#92BEFF',
        divider: '#E6E6E6',
        gray: {
          400: '#F6F6F6',
          500: '#777777',
          600: '#505050',
          DEFAULT: '#787878'
        },
        green: {
          300: '#28D39B',
          DEFAULT: '#20AC7E'
        }
      },
      boxShadow: {
        inset: 'inset 0 0 0 1.5px #00D384'
      },
      borderRadius: {
        primary: '15px'
      },
      backgroundImage: {
        primary: 'linear-gradient(114deg, #004ed1 13.03%, #078CBE 86.69%)',
        secondary: 'linear-gradient(90deg, #941115  0%, #FF2929  100%)',
        'btn-primary-gradient': 'linear-gradient(114deg, #53f3b7 13.03%, #27a078 86.69%)',
        'btn-secondary-gradient': 'linear-gradient(90deg, #FF2929 0%, #941115 100%)'
      },
      height: {
        pdf: '80vh'
      }
    }
  },
  plugins: [
    plugin(({ addBase, addComponents, theme }) => {
      const typographyComponents = getTypography(theme)
      addComponents(typographyComponents)
      addBase({
        'html, body': {
          '@apply typography-body-l': {},
          lineHeight: 'inherit'
        },
        textarea: {
          resize: 'none'
        }
      })
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.contain-strict': {
          contain: 'strict'
        }
      })
    }),
    typography
  ]
}
