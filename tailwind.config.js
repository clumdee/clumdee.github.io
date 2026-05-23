/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './*.md',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './blog/**/*.{html,md}',
    './coding/**/*.{html,md}',
    './optics/**/*.{html,md}',
    './random/**/*.{html,md}',
    './talks/**/*.{html,md}',
  ],
  safelist: [
    'text-center', 'text-right', 'text-left',
    'text-muted', 'text-dark', 'text-white', 'text-primary',
    'd-flex', 'd-inline-block', 'd-none',
    'align-items-center', 'align-items-stretch', 'justify-content-between',
    'jumbotron',
    'btn', 'btn-lg', 'btn-sm', 'btn-success', 'btn-info', 'btn-link',
    'btn-outline-secondary', 'btn-outline-light', 'btn-primary', 'btn-secondary',
    'w-25', 'w-50', 'w-75', 'w-100',
    'my-1', 'my-2', 'my-4', 'mx-0', 'mr-2',
    'px-0', 'py-0', 'py-2', 'ml-auto',
    'container', 'row', 'col-12',
    'col-xs-12', 'col-sm-12', 'col-md-12',
    'col-md-4', 'col-lg-4', 'col-lg-8', 'col-xl-4', 'col-xl-8',
    'image-caption',
    'bg-light', 'bg-white', 'bg-secondary',
    'lead',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#0d9488', // teal-600 — blue-green
          light: '#14b8a6',   // teal-500
          dark: '#0f766e',    // teal-700
        },
        ink: '#1a1a1a',
        paper: '#fafafa',
        meta: '#6b7280',
      },
      fontFamily: {
        sans: [
          '"Prompt"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        serif: [
          '"Source Serif 4"',
          '"Iowan Old Style"',
          'Georgia',
          '"Times New Roman"',
          'Times',
          '"Prompt"',
          'serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.ink'),
            '--tw-prose-headings': theme('colors.ink'),
            '--tw-prose-links': theme('colors.accent.DEFAULT'),
            '--tw-prose-bold': theme('colors.ink'),
            '--tw-prose-counters': theme('colors.meta'),
            '--tw-prose-bullets': theme('colors.meta'),
            '--tw-prose-quotes': theme('colors.ink'),
            '--tw-prose-quote-borders': theme('colors.accent.light'),
            '--tw-prose-code': theme('colors.ink'),
            '--tw-prose-pre-bg': '#f4f4f5',
            '--tw-prose-pre-code': theme('colors.ink'),
            a: {
              textDecoration: 'underline',
              textDecorationThickness: '1px',
              textUnderlineOffset: '3px',
              fontWeight: '500',
              '&:hover': { color: theme('colors.accent.dark') },
            },
            'pre': {
              borderRadius: '0.5rem',
              padding: '1rem 1.25rem',
              overflowX: 'auto',
              border: '1px solid #e5e7eb',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            'code': {
              backgroundColor: '#f4f4f5',
              padding: '0.15em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
            },
            'figure': {
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            'figcaption': {
              fontStyle: 'italic',
              color: theme('colors.meta'),
              textAlign: 'center',
            },
            'table': { fontSize: '0.875em' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
