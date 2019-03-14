import * as React from 'react';
import { ErrorBoundary } from '../../hoc/error-boundary';
import ls from 'local-storage';


export const HomePage: React.StatelessComponent<{}> = () => {  
  let accessKey = ls.get('userAccessKeyId');
  let sessionToken = ls.get('sessionToken');

  return (
    <ErrorBoundary>
      <br />
      <p>&nbsp;Wellcome, authenticated person with AWS access key: {accessKey} and session token: {sessionToken}</p>
    </ErrorBoundary>
  );
}
