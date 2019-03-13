import * as React from 'react';
import './SignIn.css';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary';
import { SignInForm } from '../../containers/auth/sign-in-form';
import { SignUpLink } from './SignUp';
import { SignInWithGoogle } from '../ui/buttons/SignInWithGoogle';
import { SignInWithFacebook } from '../ui/buttons/SignInWithFacebook';
import { SignInWithInstagram } from '../ui/buttons/SIgnInWithInstagram';


export const SignIn: React.StatelessComponent<{}> = ({ history }: { [key: string]: any }) => 
  <div className="SignIn">
    <h1>Sign-in</h1>
    <br />
    <SignInWithGoogle history={history} />
    <SignInWithFacebook history={history} />
    <SignInWithInstagram history={history} />
    <SignInForm history={history} />
    <div className="SignIn Footer">
      <SignUpLink />
    </div>
  </div>;
