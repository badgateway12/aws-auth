import * as React from 'react'
import { Aux } from '../aux'
import { ErrorBoundary } from '../error-boundary'
import { Navbar } from '../../components/ui/toolbar/navbar'


type LayoutProps = {
  children?: React.ReactNode;
}

export const Layout = (props: LayoutProps) =>
  <Aux>
    <ErrorBoundary>
      <Navbar authenticated={false} />
    </ErrorBoundary>
    <main>
      {props.children}
    </main>
  </Aux>

Layout.displayName = 'Layout'
