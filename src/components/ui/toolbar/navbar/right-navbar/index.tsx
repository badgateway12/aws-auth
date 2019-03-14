import * as React from 'react'
import { AuthNavbar } from './auth-navbar'


type RightNavbar_Props = { authenticated: boolean } & typeof styles

const styles = Object.freeze({
  ul: {className:  'navbar-nav ml-auto'}
})
  
export const RightNavbar = (props: RightNavbar_Props) =>    
  <ul {...props.ul}>
    <AuthNavbar authenticated={props.authenticated}/> 
  </ul>

RightNavbar.displayName = 'RightNavbar'
RightNavbar.defaultProps = styles
