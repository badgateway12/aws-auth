import * as React from 'react';
import { Auth } from 'aws-amplify';
import { Button, Form, FormGroup, FormControl, FormLabel, FormText } from 'react-bootstrap';
import { LoaderButton } from '../../components/ui/buttons/LoaderButton';
import { FaUser, FaEnvelopeSquare, FaKey } from 'react-icons/fa';
import * as routes from '../../constants/routes';

interface SignUpFormProps {
  confirmation_code?: string;
  email?: string;
  error?: any;
  history?: any;
  isLoading?: boolean;
  new_user?: object;
  password?: string;
}

interface SignUpFormState {
  confirmation_code: string;
  email: string;
  error: any;
  isLoading: boolean;
  new_user: object | null;
  password: string;
}

const INITIAL_STATE = Symbol();

export class SignUpForm extends React.Component<SignUpFormProps, SignUpFormState> {
  static [INITIAL_STATE] = {
    confirmation_code: '',
    email: '',
    error: null,
    isLoading: false,
    new_user: null,
    password: '',
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: SignUpFormProps) {
    super(props);
    this.state = { ...SignUpForm[INITIAL_STATE ]};
  }

  onConfirmationSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { email, password, confirmation_code } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });

    Auth.confirmSignUp(email, confirmation_code)
        .then(() => { 
          Auth.signIn(email, password);
          console.log("Signed-up and signed-in");
          history.push(routes.HOME);
        })
        .catch(error => {
          console.log(error.message);
          this.setState(() => ({ ...SignUpForm[INITIAL_STATE] }));
          this.setState(SignUpForm.propKey("error", error));
        });
 
    event.preventDefault();
  }

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = this.state;
    this.setState({ isLoading: true });

    Auth.signUp({username: email, password })
        .then((new_user) => { 
          this.setState(() => ({ new_user: new_user }));
        })
        .catch((error: { message: any; }) => {
          this.setState(() => ({ ...SignUpForm[INITIAL_STATE] }));
          this.setState(SignUpForm.propKey('error', error));
        });

    this.setState({ isLoading: false });
    event.preventDefault();
  };

  renderConfirmationForm() { 
    const { confirmation_code, isLoading} = this.state;
    const isInvalid = confirmation_code === '';
    return (
      <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => this.onConfirmationSubmit(event)}>
        <FormGroup controlId="confirmationCode">
          <FormLabel>Confirmation Code</FormLabel>
          <FormControl
            autoFocus
            type="tel"
            value={confirmation_code}
            onChange={(event: any) => this.setStateWithEvent(event, "confirmation_code")} />
          <FormText>Please check your email for the code.</FormText>
        </FormGroup>
        <LoaderButton
          block
          size="lg"
          className="bg-primary"
          disabled={isInvalid}
          type="submit"
          isLoading={isLoading}
          text="Verify"
          loadingText="Verifying…"/>
      </Form>
    );
  }

  renderForm() {
    const {email, error, password } = this.state;
    const isInvalid = email === '' || password === '';

    return (
      <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => this.onSubmit(event)}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <div className="input-group-prepend">
            <span className="bg-primary input-group-text" id="basic-addon1"><FaEnvelopeSquare/> </span>         
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
            <span className="bg-primary input-group-text" id="basic-addon1"><FaKey/> </span>         
            <FormControl
              value={password}
              onChange={(event: any) => this.setStateWithEvent(event, "password")}
              type="password" />
          </div>
        </FormGroup>
        <Button block size="lg" disabled={isInvalid} type="submit" className="bg-primary">Sign-up</Button>
        {error && <p>{error.message}</p>}
      </Form>   
    );
  }

  render() {
    return (
      this.state.new_user === null 
        ? this.renderForm() 
        : this.renderConfirmationForm()
    );
  }

  private setStateWithEvent(event: any, columnType: string): void {
    this.setState(SignUpForm.propKey(columnType, (event.target as any).value));
  }
};