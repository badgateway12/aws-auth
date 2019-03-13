import * as React from 'react';
import { Auth } from 'aws-amplify';
import { Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { FaUser, FaKey } from 'react-icons/fa';
import * as routes from '../../constants/routes';

interface SignInFormProps {
  email?: string;
  error?: any;
  history?: any;
  password?: string;
}

interface SignInFormState {
  email: string;
  error: any;
  password: string;
}

const INITIAL_STATE = Symbol();

export class SignInForm extends React.Component<SignInFormProps, SignInFormState> {
  static [INITIAL_STATE] = {
    email: '',
    error: null,
    password: ''
  };

  static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: SignInFormProps) {
    super(props);

    this.state = { ...SignInForm[INITIAL_STATE] };
  }

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = this.state;
    const { history } = this.props;
    
    Auth.signIn(email, password)
        .then(() => { 
          this.setState(() => ({ ...SignInForm[INITIAL_STATE] }));
          history.push(routes.HOME);
        })
        .catch(error => {
          console.log(error)
          this.setState(SignInForm.propKey('error', error));
        });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = email === '' || password === '';

    return (
      <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => this.onSubmit(event)}>  
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <div className="input-group-prepend">
            <span className="bg-primary input-group-text"><FaUser/> </span>         
            <FormControl
              autoFocus
              type="text"
              value={email}
              onChange={(event: any) => this.setStateWithEvent(event, "email")} />
          </div>
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <div className="input-group-prepend">
            <span className="bg-primary input-group-text"><FaKey/> </span>         
            <FormControl
              value={password}
              onChange={(event: any) => this.setStateWithEvent(event, "password")}
              type="password" />
          </div>
        </FormGroup>
        <Button block size="lg" disabled={isInvalid} type="submit" className="bg-primary">Sign-in</Button>
        {error && <p>{error.message}</p>}
      </Form>   
    );
  }

  private setStateWithEvent(event: any, columnType: string): void {
    this.setState(SignInForm.propKey(columnType, (event.target as any).value));
  }
};
