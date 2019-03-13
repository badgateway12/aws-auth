import * as React from 'react';
import { Auth } from 'aws-amplify';
import { FacebookLoginButton } from 'react-social-login-buttons';
import * as routes from '../../../constants/routes';
import * as config from '../../../utils/config';
import ls from 'local-storage';


interface InterfaceProps {
  error?: any;
  history?: any;
}
  
interface InterfaceState {
  error: any;
}

declare global {
  interface Window { FB: any; fbAsyncInit: () => void;}
}
window.FB = window.FB || {};

function waitForInit() {
  return new Promise((res, rej) => {
    const hasFbLoaded = () => {
      if (window.FB) {
        res();
      } else {
        setTimeout(hasFbLoaded, 300);
      }
    };
    hasFbLoaded();
  });
}
  
export class SignInWithFacebook extends React.Component<InterfaceProps,InterfaceState> {
  private static INITIAL_STATE = {
    error: null
  };
  
  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  };
  
  constructor(props: InterfaceProps) {
    super(props);

    this.state = { ...SignInWithFacebook.INITIAL_STATE };
  };

  async componentDidMount() {
    this.loadFacebookSDK();
    await waitForInit();
  };
  
  private loadFacebookSDK() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId   : config.FB_APP_ID,
        xfbml   : config.FB_XFBML,
        version : config.FB_VERSION
      });
    };
  
    (function(d, s, id){
       var js: any, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = config.FB_SCRIPT_SOURCE;
       fjs.parentNode!.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  };

  signIn = () => {
    window.FB.login(this.checkLoginState, {scope: config.FB_SCOPE});
  };

  checkLoginState = () => {
    window.FB.getLoginStatus(this.statusChangeCallback);
  };

  statusChangeCallback = (response: facebook.StatusResponse) => {
    if (response.status === 'connected') {
      console.log(response.authResponse);
      this.handleResponse(response.authResponse);
    } else {
      this.handleError(response);
    }
  };

  handleError(status: facebook.StatusResponse) {
    console.log('error, status: ', status.status);
  }

  async handleResponse(data: facebook.AuthResponse) {
    const { history } = this.props;

    const { accessToken: token, expiresIn, userID } = data;
    const expires_at = expiresIn * 1000 + new Date().getTime();

    try {
      const response = await Auth.federatedSignIn(
        'facebook',
        { token, expires_at },
        { name: userID }
      );
      console.log('user is authenticated: ', response);
      ls.set('userAccessKeyId', response.accessKeyId);
      ls.set('sessionToken', response.sessionToken);
      history.push(routes.HOME);
    } catch (e) {
      console.log(e);
    }
  }

  render () {
    return (
      <FacebookLoginButton onClick={this.signIn}>
        <span>&nbsp;Sign-in with Facebook</span>
      </FacebookLoginButton>
    );
  }
}
