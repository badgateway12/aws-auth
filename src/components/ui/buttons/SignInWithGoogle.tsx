import * as React from 'react';
import { Auth } from 'aws-amplify';
import { GoogleLoginButton } from 'react-social-login-buttons';
import * as routes from '../../../constants/routes';
import * as config from '../../../utils/config';
import ls from 'local-storage';


declare global {
  interface Window { gapi: any; }
};
window.gapi = window.gapi || {};

interface InterfaceProps {
  error?: any;
  history?: any;
}

interface InterfaceState {
  error: any;
}

interface GoogleUser {
  getAuthResponse(): { id_token: any; expires_at: any; };
  getBasicProfile(): any;
}

function waitForInit() {
  return new Promise((res, rej) => {
    const hasGoogleLoaded = () => {
      const ga = window.gapi && window.gapi.auth2 ? window.gapi.auth2.getAuthInstance() : null;
      if (ga) {
        res();
      } else {
        setTimeout(hasGoogleLoaded, 300);
      }
    };
    hasGoogleLoaded();
  });
}

export class SignInWithGoogle extends React.Component<InterfaceProps,InterfaceState> {
  private static INITIAL_STATE = {
    error: null
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: InterfaceProps) {
    super(props);

    this.state = { ...SignInWithGoogle.INITIAL_STATE };
  }

  async componentDidMount() {
    this.loadGoogleSDK();
    await waitForInit();
  };

  public signIn() {
    const ga = window.gapi.auth2.getAuthInstance();
    ga.signIn().then(
      (googleUser: GoogleUser) => { this.getAWSCredentials(googleUser); },
      (error: any) => { console.log(error); }
  );
  }

  public async getAWSCredentials(googleUser: GoogleUser) {
    console.log('googleUser: ', googleUser);
    const { id_token, expires_at } = googleUser.getAuthResponse();
    const profile = googleUser.getBasicProfile();
    let user = {
      email: profile.getEmail(),
      name: profile.getName()
    };    
    await Auth
            .federatedSignIn('google', { token: id_token, expires_at }, user)
            .then((credentials) => { 
              console.log('user is uathenticated: ', credentials); 
              ls.set('userAccessKeyId', credentials.accessKeyId);
              ls.set('sessionToken', credentials.sessionToken);
            })
            .catch((err)=>{console.log(err);});

    const { history } = this.props;
    history.push(routes.HOME);
  }

  public  loadGoogleSDK() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.onload = this.initGapi;
    document.body.appendChild(script);
  }

  public initGapi() {
    const g = window.gapi;
    g.load('auth2', function() {
      g.auth2.init({client_id: config.GOOGLE_APP_ID,
                        scope: config.GOOGLE_SCOPE});
    });
  }

  render() {
    return (
      <GoogleLoginButton onClick={this.signIn.bind(this)}>
        <span>&nbsp;Sign-in with Google</span>
      </GoogleLoginButton>
    );
  }
};
