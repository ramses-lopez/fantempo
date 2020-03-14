import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error }
  }

  // componentDidCatch(error, errorInfo) {
  //   console.error('oh no!', error, errorInfo);
  // }

  render() {
    if (this.state.hasError) {
      return <h3>Something went wrong</h3>
    }

    return this.props.children
  }
}

export default ErrorBoundary