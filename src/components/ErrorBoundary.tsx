import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#090d20] flex items-center justify-center p-6 text-slate-100 font-sans">
          <div className="max-w-md w-full bg-gradient-to-b from-[#1c183b] to-[#2b173f] border border-pink-400/40 rounded-3xl p-8 text-center shadow-2xl space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300">
              <AlertCircle className="w-7 h-7" />
            </div>

            <h2 className="font-heading font-bold text-2xl text-white">
              Something went wrong
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              We encountered a minor hitch. Tap the button below to clear the error and refresh Monisha's celebration!
            </p>

            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-medium text-sm shadow-lg shadow-pink-500/30 active:scale-95 transition-all cursor-pointer mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Clear Error & Reload Surprise ✨</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
