import * as React from 'react'
import { Link } from 'react-router-dom'
import { FaSignInAlt, FaPencilAlt } from 'react-icons/fa'
import * as routes from '../../../../../../constants/routes'


type UnauthNavigationProps = {} & typeof styles

const styles = Object.freeze({
  li: {className:  'nav-item'},
  link: {className:  'nav-link'}
})
  
export const UnauthNavigation = (props: UnauthNavigationProps) =>    
  <>
    <li {...props.li}>
      <Link {...props.link} to={routes.SIGN_IN}><FaSignInAlt /> SignIn</Link>
    </li>
    <li {...props.li}>
      <Link {...props.link} to={routes.SIGN_UP}><FaPencilAlt /> SignUp</Link>
    </li>
  </>

  UnauthNavigation.displayName = 'UnauthNavigation'
  UnauthNavigation.defaultProps = styles
