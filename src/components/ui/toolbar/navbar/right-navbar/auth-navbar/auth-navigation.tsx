import * as React from 'react'
import { Link } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'
import * as routes from '../../../../../../constants/routes'


type AuthNavigationProps = {} & typeof styles

const styles = Object.freeze({
  li: {className:  'nav-item'},
  link: {className:  'nav-link'}
})
  
export const AuthNavigation = (props: AuthNavigationProps) =>    
  <>
    <li {...props.li}>
      <Link {...props.link} to={routes.SIGN_OUT}><FaSignOutAlt /> SignOut</Link>
    </li>
  </>

  AuthNavigation.displayName = 'AuthNavigation'
  AuthNavigation.defaultProps = styles
