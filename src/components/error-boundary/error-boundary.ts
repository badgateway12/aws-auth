import { withErrorBoundary } from '../../hoc/withErrorBoundary/with-error-boundary';
import { ErrorMessage } from './error-message';

export const ErrorBoundary = withErrorBoundary(ErrorMessage);
