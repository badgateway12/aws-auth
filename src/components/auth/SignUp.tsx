import * as React from 'react';
import { Link } from 'react-router-dom';
import * as routes from "../../constants/routes";
import  {SignUpForm } from '../../containers/auth/sign-up-form';
import './SignUp.css';

export const SignUp: React.StatelessComponent<{}> = ({ history }: { [key: string]: any }) =>
  <div className="SignUp">
    <h1>Sign-up</h1>
    <br />
    <SignUpForm history={history} />
  </div>;

export const SignUpLink: React.StatelessComponent<{}> = () =>
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}> Sign up</Link>
  </p>;
 