import * as React from 'react';
import { Logo } from '../../logo'
import { TogglerButton } from '../../buttons/toggler-button'
import { LeftNavbar } from './left-navbar'
import { RightNavbar } from './right-navbar'


type NavbarProps = { authenticated: boolean } & typeof styles

const styles = Object.freeze({ 
  nav: {className: 'navbar navbar-expand-lg navbar-dark bg-primary'},
  collapse: {className: 'collapse navbar-collapse', id: 'navbarColor01'},
})

export const Navbar = (props: NavbarProps) =>    
  <nav {...props.nav}>
    <Logo />
    <TogglerButton />
    <div {...props.collapse}>
      <LeftNavbar />
      <RightNavbar authenticated={props.authenticated} />
    </div>
  </nav>

Navbar.displayName = 'Navbar'
Navbar.defaultProps = styles
