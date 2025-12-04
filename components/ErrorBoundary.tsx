import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('UI error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 text-red-300 p-6">
          <h1 className="text-2xl font-bold">Se produjo un error en la UI</h1>
          <p className="mt-2 text-sm">Revisa la consola del navegador para más detalles.</p>
          {this.state.error && (
            <pre className="mt-4 bg-gray-800 text-red-200 p-3 rounded overflow-auto text-xs">
              {String(this.state.error.stack || this.state.error.message)}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
