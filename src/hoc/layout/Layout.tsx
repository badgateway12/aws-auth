import * as React from 'react';
import { Aux } from '../aux/Aux';
import { Navbar } from '../../containers/navbar/Navbar';

type LayoutProps = {
  children?: React.ReactNode;
}

export const Layout = (props: LayoutProps) =>
  <Aux>
    <Navbar />
    <main>
      {props.children}
    </main>
  </Aux>;

Layout.displayName = 'Layout';
