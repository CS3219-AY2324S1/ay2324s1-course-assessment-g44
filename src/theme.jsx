import { createTheme } from '@mantine/core';


const theme = createTheme({
    colors: {
      // Add your color
      deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
      // or replace default theme color
      blue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
    },
  
    shadows: {
      md: '1px 1px 3px rgba(0, 0, 0, .25)',
      xl: '5px 5px 3px rgba(0, 0, 0, .25)',
    },
  
    headings: {
      fontFamily: 'Roboto, sans-serif',
      sizes: {
        h1: { fontSize: rem(36) },
      },
    },
  });
  
  export default theme