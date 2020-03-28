import React from 'react';
import StyledHeading from '../atoms/Heading/Heading';

class ErrorBoundary extends React.Component {
  state = { error: null };

  componentDidCatch(error: Error) {
    this.setState({
      error,
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return (
        <div>
          <StyledHeading>Something went wrong.</StyledHeading>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
