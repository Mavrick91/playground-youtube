'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Button from '../shared/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-[496px] border border-purple-400 rounded-md flex items-center justify-center flex-col gap-4">
          <h1 className="font-medium text-gray-800">Component has failed</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
