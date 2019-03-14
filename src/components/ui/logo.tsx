import React from 'react'
import { Link } from 'react-router-dom'
import * as routes from '../../constants/routes'


type LogoProps = {} & typeof defaultProps

const defaultProps = Object.freeze({
  className:  'navbar-brand',
  to: routes.LANDING 
})

export const Logo = (props: LogoProps) => 
  <Link { ...props }>{'Logo'}</Link>

Logo.defaultProps = defaultProps
Logo.displayName = 'Logo'
