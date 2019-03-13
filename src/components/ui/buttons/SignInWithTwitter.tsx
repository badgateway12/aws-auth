import * as React from 'react';
import { Auth } from 'aws-amplify';
import { TwitterLoginButton } from "react-social-login-buttons";
import * as routes from '../../../constants/routes';


interface TwitterUser {
  
}

interface InterfaceProps {
  error?: any;
  history?: any;
}

interface InterfaceState {
  error: any;
}

export class SignInWithTwitter extends React.Component<InterfaceProps,InterfaceState> {
  private static INITIAL_STATE = {
    error: null
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: InterfaceProps) {
    super(props);

    this.state = { ...SignInWithTwitter.INITIAL_STATE };
  }

  componentDidMount() {
  
  }

  public signIn() {
 
  }

  public async getAWSCredentials(twitterUser: TwitterUser) {
 
  }


  render() {
    return (
      <TwitterLoginButton onClick={this.signIn}>
        <span>&nbsp;Sign-in with Twitter</span>
      </TwitterLoginButton>
    );
  }
};
