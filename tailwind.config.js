/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react')
module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    '0%': {
                        opacity: 0
                    },
                    '100%': {
                        opacity: 1
                    }
                },
                blink: {
                    '50%': {
                        borderColor: 'transparent'
                    },
                    '100%': {
                        borderColor: 'white'
                    }
                }
            },
            animation: {
                typing: 'typing 2s steps(20) infinite alternate, blink .7s infinite',
                typing_not_infinte:
                            'typing 2s steps(12), blink 0.5s infinite step-end alternate'
            },
            colors: {
                transparent: 'transparent',
                blue: {
                    500: '#009CFB'
                },
                red: {
                    500: '#F70A60'
                },
                green: {
                    500: '#22B85E'
                },
                primary: {
                    50: '#FFFFFF',
                    100: '#EFFCFF',
                    200: '#E8E8E8',
                    300: '#D9D9D9',
                    400: '#676161',
                    500: '#000000'
                },
                secondary: {
                    50: '#FFFFFF',
                    100: '#D9D9D9',
                    200: '#A9A9A9',
                    300: '#3E3E45',
                    400: '#27272A',
                    450: '#18181b',
                    500: '#000000'
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            }
        },

        screens: {
            xs: '300px',
            s: '480px',
            sm: '640px',
            md: '768px',
            lg: '960px',
            l: '991px',
            xl: '1200px',
            xlg: '1440px',
            xxlg: '2000px'
        },
        scale: {
            0: '0',
            25: '.25',
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
            225: '2.25',
            250: '2.5',
            300: '3'
        }
    },
    plugins: [
        nextui({
            layout: {
                spacingUnit: 4, // in px
                disabledOpacity: '.5', // this value is applied as opacity-[value] when the component is disabled
                dividerWeight: '1px', // h-divider the default height applied to the divider component
                fontSize: {
                    tiny: '0.75rem', // text-tiny
                    small: '0.875rem', // text-small
                    medium: '1rem', // text-medium
                    large: '1.125rem' // text-large
                },
                lineHeight: {
                    tiny: '1rem', // text-tiny
                    small: '1.25rem', // text-small
                    medium: '1.5rem', // text-medium
                    large: '1.75rem' // text-large
                },
                radius: {
                    small: '8px', // rounded-small
                    medium: '12px', // rounded-medium
                    large: '14px' // rounded-large
                },
                borderWidth: {
                    small: '1px', // border-small
                    medium: '2px', // border-medium (default)
                    large: '3px' // border-large
                }
            },
            themes: {
                light: {
                    layout: {
                        boxShadow: {
                            // shadow-small
                            small:
                '0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)',
                            // shadow-medium
                            medium:
                '0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)',
                            // shadow-large
                            large:
                '0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)'
                        }
                    }
                },
                dark: {
                    layout: {
                        boxShadow: {
                            // shadow-small
                            small:
                '0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)',
                            // shadow-medium
                            medium:
                '0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)',
                            // shadow-large
                            large:
                '0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)'
                        }
                    }
                }
            }
        }),
        require('tailwindcss'), require('autoprefixer')]
}
