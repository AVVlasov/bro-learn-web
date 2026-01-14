import React from 'react'
import {
  ChakraProvider as ChacraProv,
  createSystem,
  defaultConfig,
  defineConfig,
} from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'

const ChacraProvider: React.ElementType = ChacraProv

// Duolingo-inspired theme configuration
const duolingoConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Duolingo Primary Colors
        duo: {
          green: { value: '#58CC02' },
          greenDark: { value: '#58A700' },
          greenLight: { value: '#89E219' },
          blue: { value: '#1CB0F6' },
          blueDark: { value: '#1899D6' },
          yellow: { value: '#FFC800' },
          yellowDark: { value: '#FFA500' },
          red: { value: '#FF4B4B' },
          redDark: { value: '#EA2B2B' },
          orange: { value: '#FF9600' },
          purple: { value: '#CE82FF' },
          pink: { value: '#FF86D0' },
        },
        // Neutral Colors
        neutral: {
          50: { value: '#FFFFFF' },
          100: { value: '#F7F7F7' },
          200: { value: '#E5E5E5' },
          300: { value: '#AFAFAF' },
          400: { value: '#777777' },
          500: { value: '#4B4B4B' },
          600: { value: '#3C3C3C' },
          700: { value: '#2B2B2B' },
          800: { value: '#1A1A1A' },
          900: { value: '#131F24' },
        },
      },
      fonts: {
        heading: { value: '"Nunito", "DIN Round Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' },
        body: { value: '"Nunito", "DIN Round Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' },
      },
      radii: {
        duo: {
          sm: { value: '12px' },
          md: { value: '16px' },
          lg: { value: '20px' },
          xl: { value: '24px' },
          full: { value: '999px' },
        },
      },
      shadows: {
        duo: {
          sm: { value: '0 2px 4px rgba(0, 0, 0, 0.05)' },
          md: { value: '0 4px 8px rgba(0, 0, 0, 0.1)' },
          lg: { value: '0 8px 16px rgba(0, 0, 0, 0.12)' },
          button: { value: '0 4px 0 #58A700' },
          buttonBlue: { value: '0 4px 0 #1899D6' },
          buttonRed: { value: '0 4px 0 #EA2B2B' },
        },
      },
    },
    semanticTokens: {
      colors: {
        // Background
        'bg.canvas': {
          value: { base: '#131F24', _light: '#FFFFFF' },
        },
        'bg.surface': {
          value: { base: '#1A2C32', _light: '#FFFFFF' },
        },
        'bg.muted': {
          value: { base: '#2B3F47', _light: '#F7F7F7' },
        },
        'bg.success': {
          value: { base: 'rgba(88, 204, 2, 0.15)', _light: 'rgba(88, 204, 2, 0.1)' },
        },
        'bg.error': {
          value: { base: 'rgba(255, 75, 75, 0.15)', _light: 'rgba(255, 75, 75, 0.1)' },
        },
        // Text
        'fg.default': {
          value: { base: '#FFFFFF', _light: '#4B4B4B' },
        },
        'fg.muted': {
          value: { base: '#AFAFAF', _light: '#777777' },
        },
        'fg.subtle': {
          value: { base: '#777777', _light: '#AFAFAF' },
        },
        // Borders
        'border.default': {
          value: { base: '#3C4F58', _light: '#E5E5E5' },
        },
        'border.active': {
          value: '#58CC02',
        },
        // Duolingo specific
        'duo.primary': {
          value: '#58CC02',
        },
        'duo.secondary': {
          value: '#1CB0F6',
        },
        'duo.accent': {
          value: '#FFC800',
        },
        'duo.streak': {
          value: '#FF9600',
        },
        'duo.success': {
          value: '#58CC02',
        },
        'duo.error': {
          value: '#FF4B4B',
        },
      },
    },
  },
  globalCss: {
    '*': {
      boxSizing: 'border-box',
    },
    'html, body': {
      margin: 0,
      padding: 0,
      fontFamily: 'body',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    // Import Nunito font
    '@import': "url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap')",
  },
})

const system = createSystem(defaultConfig, duolingoConfig)

export const Provider = (props: PropsWithChildren) => (
  <ChacraProvider value={system}>{props.children}</ChacraProvider>
)
