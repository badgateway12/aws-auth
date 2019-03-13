import React from 'react';
import { Routes } from './routes/router';
import { Layout } from './hoc/layout/Layout';

interface AppProps {
  history?: any;
  isAuthenticated?: boolean;
  isAuthenticating?: boolean;
}

interface AppState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
}

const INITIAL_STATE = Symbol();

export class App extends React.Component<AppProps, AppState> {
  static displayName = 'App';

  static [INITIAL_STATE] = {
    isAuthenticated: false,
    isAuthenticating: true
  }

  constructor(props: AppProps) {
    super(props);
    this.state = { ...App[INITIAL_STATE] };
  } 
  
  render () {
    return (
      <>
        <Layout>
          <br />
          <Routes />
        </Layout>
      </>
    );
  }
}
