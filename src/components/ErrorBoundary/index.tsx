'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  callback?: () => void;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { callback } = this.props;
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo);

    if (callback) {
      callback();
    }
  }

  public render() {
    const { hasError } = this.state;
    const { children, callback } = this.props;

    if (hasError && callback) {
      return null;
    }

    if (hasError) {
      return (
        <div className="h-[496px] border border-purple-400 rounded-md flex items-center justify-center flex-col gap-4">
          <h1 className="font-medium text-gray-800">Component has failed</h1>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
