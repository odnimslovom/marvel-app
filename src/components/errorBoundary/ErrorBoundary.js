import {Component} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
  state = {
    hasError: false
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
    this.setState({
      hasError: true
    })
  }

  render() {
    const errStyle = {
      color : "red",
      margin: "20px auto",
      textAlign: "center",
    };

    if (this.state.hasError) {
      return (
        <div style={
          {
            border: "1px solid red",
            padding: "10px",
            borderRadius: "10px",
          }
        }>
          <h2 style={errStyle}>Something went wrong</h2>
          <ErrorMessage />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
