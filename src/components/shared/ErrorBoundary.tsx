import React, { Component, ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", { error, info });
    // Optionally: Log to external service
  }

  render(): ReactNode {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <div className="text-center m-2">
          <h4>Something went wrong</h4>
          {error?.message && <p>{error.message}</p>}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
