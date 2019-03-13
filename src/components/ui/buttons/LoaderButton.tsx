import React from 'react';
import { Button } from 'react-bootstrap';
import { FaSyncAlt } from 'react-icons/fa';
import "./LoaderButton.css";

interface LoaderButtonProps {
  block: boolean,
  type: 'button' | 'submit',
  size: 'sm' | 'lg',
  className: string,
  disabled: boolean,
  isLoading: boolean,
  text: string,
  loadingText: string
}

export const LoaderButton: React.FunctionComponent<LoaderButtonProps> = (props) => 
  <Button 
           block={props.block}
           type={props.type}
           size={props.size}
           className={"LoaderButton ${props.className}"}
           disabled={props.disabled || props.isLoading}>
           {props.isLoading && <FaSyncAlt className="spinning" />}
           {!props.isLoading ? props.text : props.loadingText}
  </Button>;

LoaderButton.defaultProps = {
  block: false,
  type: 'submit',
  size: 'lg',
  isLoading: false,
  text: 'Submit',
  loadingText: 'Processing...',
  className: '',
  disabled: true
}