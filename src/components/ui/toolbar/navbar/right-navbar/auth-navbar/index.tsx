import * as React from 'react'
import { UnauthNavigation} from './unauth-navigation'
import { AuthNavigation } from './auth-navigation'


type AuthNavbarProps = { authenticated: boolean }
  
export const AuthNavbar = (props: AuthNavbarProps) =>    
  <>
    { props.authenticated ? <AuthNavigation /> : <UnauthNavigation /> }
  </>

AuthNavbar.displayName = 'AuthNavbar'
