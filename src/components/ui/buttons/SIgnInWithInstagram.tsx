import * as React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import * as config from '../../../utils/config';
import { InstagramLoginButton } from "react-social-login-buttons";
import * as routes from '../../../constants/routes';
import ls from 'local-storage';


interface InstagramUser {
  data: any; 
}

interface InterfaceProps {
  error?: any;
  history?: any;
}

interface InterfaceState {
  error: any;
}

export class SignInWithInstagram extends React.Component<InterfaceProps,InterfaceState> {
  private static INITIAL_STATE = {
    error: null,
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: InterfaceProps) {
    super(props);
    this.state = { ...SignInWithInstagram.INITIAL_STATE };
  }

  componentDidMount() {
    if (window.location.search.includes('code')) {
      const сode = this.getQueryVariable('code');
      console.log(сode);
      this.requestAccessToken(сode);
    } else if (window.location.search.includes('error')) {
        console.log('error: ', this.getQueryVariable('error'));
        console.log('error_reason: ', this.getQueryVariable('error_reason'));
        console.log('error_description: ', this.getQueryVariable('error_description'));
    }
  }

  private requestAccessToken(сode: any) {
    axios
    .post('https://api.instagram.com/oauth/access_token',
          'client_id='+config.INSTAGRAM_APP_ID+'&client_secret='+config.INSTAGRAM_APP_SECRET+'&grant_type=authorization_code&redirect_uri=https://localhost:3000/signin&code=' + сode)
    .then((res: InstagramUser)=>{
      const token = res.data.access_token;
      const id = res.data.user.id;
      const username = res.data.user.username;
      console.log('access_token: ', token);
      console.log('id: ', id);
      console.log('username: ', username);
      this.getAWSCredentials(res);
    })
    .catch((res: any)=>{console.log(res);});
  }

  private getQueryVariable(variable: string) {
    const query = window.location.search.substring(1)
    const vars = query.split('&')
    const code = vars
      .map(i => { const pair = i.split('=')
        if (pair[0] === variable) { return pair[1] } return null })
      .filter(d => { if (d) { return true } return false
      })
  
    return code[0]
  }

  public signIn() {
    window.location.href = config.INSTAGRAM_LOGIN_URL;
  }

  public getAWSCredentials(instagramUser: InstagramUser) {
    console.log('getting aws credentials for token ', instagramUser.data.access_token);
    console.log('getting aws credentials for id ', instagramUser.data.user.id);
    var AWS = require('aws-sdk');
    AWS.config.update({
      region: 'eu-central-1',
    });
    var cognitoidentity = new AWS.CognitoIdentity();

    var params = {
      IdentityPoolId: 'eu-central-1:4fbaefe4-9f33-49ac-8f0a-71ec92341e81',	
       Logins: {
          'instagram': instagramUser.data.user.id
       }
    };

    var gotToken;
    cognitoidentity.getOpenIdTokenForDeveloperIdentity(params, function(err: any, data: any) {
      if (err) { 
        console.log(err); 
      }
      else {
        console.log(data);
        gotToken = data.token;
        console.log('Server returned token ', data.token);
      }
    });

    var IDENTITY_PARAMS =
    {
     IdentityPoolId: 'eu-central-1:4fbaefe4-9f33-49ac-8f0a-71ec92341e81',
     RoleSessionName: 'web',
    };

    var params2 = IDENTITY_PARAMS;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials(params2);
 
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'eu-central-1:4fbaefe4-9f33-49ac-8f0a-71ec92341e81',
      IdentityId: AWS.config.credentials.params.IdentityId,
        Logins: {
        'cognito-identity.amazonaws.com': gotToken 
      }
});

AWS.config.credentials.get(function(err:any, data:any){
  if (err) 
    console.log(err); 
  else     
    console.log(AWS.config.credentials);
    ls.set('userAccessKeyId', AWS.config.credentials.accessKeyId);
    ls.set('sessionToken', AWS.config.credentials.sessionToken);
});

const { history } = this.props;
history.push(routes.HOME);

}

  render() {
    return (
      <>
        <InstagramLoginButton onClick={this.signIn}>
          <span>&nbsp;Sign-in with Instagram</span>
        </InstagramLoginButton>
      </>
    );
  }
};
