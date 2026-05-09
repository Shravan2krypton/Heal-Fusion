import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '2rem',
          textAlign: 'center',
          gap: '1rem',
        }}>
          <div style={{ fontSize: '4rem' }}>⚠️</div>
          <h2 style={{ color: 'var(--gray-800, #1f2937)', margin: 0 }}>Something went wrong</h2>
          <p style={{ color: 'var(--gray-500, #6b7280)', maxWidth: '480px' }}>
            An unexpected error occurred. Please try reloading the page.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <pre style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '1rem',
              fontSize: '0.8rem',
              color: '#dc2626',
              maxWidth: '600px',
              overflow: 'auto',
              textAlign: 'left',
            }}>
              {this.state.error.toString()}
            </pre>
          )}
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 2rem',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
            }}
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
