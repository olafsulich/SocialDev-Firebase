import React from 'react';
import PropTypes from 'prop-types';
import StyledHeading from '../atoms/Heading/Heading';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { errorInfo } = this.state;
    const { children } = this.props;

    if (errorInfo) {
      // Error path
      return (
        <div>
          <StyledHeading>Something went wrong.</StyledHeading>
        </div>
      );
    }
    // Normally, just render children
    return children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ErrorBoundary;
