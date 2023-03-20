const theme = {
  colors: {
    primaryColor: '#FFFFFF',
    secondaryColor: '#F4F7FD',
    purpleColor: '#827FD3',
    blackColor: '#000',
    redColor: '#ad081b',
    lite_greenColor: '#1AEB47',
  },
  font: {
    sizes: {
      small: '1.6rem',
      extra_small: '3.2rem',
      large: '4.8rem',
      extra_large: '6.4rem',
      big: '8rem',
      extra_big: '9.6rem',
    },
    family: {
      primary: "'Plus Jakarta Sans'",
    },
  },
  media: {
    lteMedium: '(max-width: 768px)',
    phone: '(max-width: 780px)',
    tablet: '(max-width: 950px)',
    lapTop: '(max-width: 1500px)',
  },
  media_screen_size: {
    phone: '@media (max-width: 780px)',
    tablet: '@media (max-width: 950px) and (min-width: 781px)',
    lapTop: '@media (max-width: 1500px) and (min-width: 951px)',
  },
  padding: {
    small: '1.6rem',
    extra_small: '3.2rem',
    large: '4.8rem',
    extra_large: '6.4rem',
    big: '8rem',
    extra_big: '9.6rem',
  },
} as const;

export { theme };
