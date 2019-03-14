import React from 'react'


type TogglerButtonProps = { } & typeof defaultTogglerButtonProps 

const defaultTogglerButtonProps = Object.freeze({ 
  className: 'navbar-toggler',
  type: 'button',
  'data-toggle': 'collapse',
  'data-target': '#navbarColor01',
  'aria-controls': 'navbarColor01',
  'aria-expanded': false,
  'aria-label': 'Toggle navigation',
})

export const TogglerButton = (props: TogglerButtonProps) => 
  <button {...props}>
    <span className={'navbar-toggler-icon'}></span>
  </button>

TogglerButton.displayName = 'TogglerButton'
TogglerButton.defaultProps = defaultTogglerButtonProps
