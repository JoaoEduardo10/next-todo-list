import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../styles/globals-styles';
import { theme } from '../styles/theme';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <GlobalStyles />
        </ThemeProvider>
      </Provider>
    </NextAuthProvider>
  );
}
