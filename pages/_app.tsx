import Head from 'next/head';
import { AppProps } from 'next/app';
import { Container } from 'semantic-ui-react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import 'semantic-ui-css/semantic.min.css';
import './styles.css';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import store from '../store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Head>
        <title>Memo App</title>
      </Head>
      <Sidebar>
        <Header />
        <SCContaner fluid>
          <Component {...pageProps} />
        </SCContaner>
      </Sidebar>
    </Provider>
  );
};

const SCContaner = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  min-width: 87.5vw;
  min-height: 100vh;
`;

export default MyApp;
