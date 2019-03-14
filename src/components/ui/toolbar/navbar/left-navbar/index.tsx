import * as React from 'react'


type LeftNavbar_Props = typeof styles

const styles = Object.freeze({
  ul: {className:  'navbar-nav mr-auto'}
})
  
export const LeftNavbar = (props: LeftNavbar_Props) => 
    <ul {...props.ul}>   
    </ul>  
  

LeftNavbar.displayName = 'LeftNavbar'
LeftNavbar.defaultProps = styles
