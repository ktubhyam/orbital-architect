'use client';

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error.message);
    console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          {this.props.fallback}
          {this.state.error && (
            <div className="fixed bottom-4 left-4 right-4 z-100 bg-black/90 border border-red-500/30 p-3 font-mono text-[10px] text-red-400/70 max-h-32 overflow-auto">
              <div className="text-red-400 font-bold mb-1">debug:</div>
              <div>{this.state.error.message}</div>
            </div>
          )}
        </>
      );
    }
    return this.props.children;
  }
}
