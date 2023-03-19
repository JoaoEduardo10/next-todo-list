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
