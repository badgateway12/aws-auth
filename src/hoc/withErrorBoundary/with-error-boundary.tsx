import * as React from 'react';
import { Subtract } from 'utility-types';
import { SWALLOWED_ERROR } from '../../constants/errors';


interface InjectedProps {
  onReset: () => any;
}

export const withErrorBoundary = <BaseProps extends InjectedProps>(
  BaseComponent: React.ComponentType<BaseProps>) => {
    
    type HocProps = Subtract<BaseProps, InjectedProps> & { };
    type HocState = { readonly error: Error | null | undefined; };

    return class Hoc extends React.Component<HocProps, HocState> {
      static displayName = `withErrorBoundary(${BaseComponent.name})`;
      static readonly WrappedComponent = BaseComponent;

      readonly state: HocState = { error: undefined };

      componentDidCatch(error: Error | null, info: object) {
        this.setState({ error: error || new Error(SWALLOWED_ERROR) });
        this.logError(error, info);
      }

      logError = (error: Error | null, info: object) => { };

      handleReset = () => {
        this.setState({ error: undefined });
      };

      render() {
        const { children } = this.props as { children: React.ReactNode; };
        const { ...restProps } = this.props as any;
        const { error } = this.state;
       
        return (
          error 
            ? <BaseComponent onReset={this.handleReset} {...restProps} /> 
            : children
        );
    }
  };
};