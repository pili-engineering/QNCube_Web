import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { Button } from 'antd';
import './index.scss';

const ErrorBoundaryFallback: React.FC<FallbackProps> = (props) => {
  const { error, resetErrorBoundary } = props;
  return (
    <div className="error-boundary-fallback">
      <div>Oh no</div>
      <pre>{error.message}</pre>
      <Button
        type="primary"
        onClick={() => {
          // this next line is why the fallbackRender is useful
          // though you could accomplish this with a combination
          // of the FallbackCallback and onReset props as well.
          resetErrorBoundary();
        }}
      >
        Try again
      </Button>
    </div>
  );
};

export default ErrorBoundaryFallback;
