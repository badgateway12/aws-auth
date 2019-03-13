import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import Amplify from 'aws-amplify';
import * as config from './utils/config';

import 'bootswatch/dist/superhero/bootstrap.css';
import './index.css';

import * as serviceWorker from './serviceWorker';
  
require('dotenv').config();

Amplify.configure({
  Auth: {
    mandatorySignIn : config.COGNITO_MANDATORY_SIGN_IN,
    region: config.COGNITO_REGION,
    userPoolId: config.COGNITO_USER_POOL_ID,
    userPoolWebClientId: config.COGNITO_APP_ID,
    identityPoolId: config.COGNITO_IDENTITY_POOL_ID
  }
 });
  
ReactDOM.render(
    <Router>
      <App />
    </Router>,
document.getElementById('root'));

serviceWorker.unregister();
