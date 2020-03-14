import React from "react";

class ValidatorInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleKeyDown = (event) => {
    // Handle the delete/backspace key
    if (event.keyCode === 8 || event.keyCode === 46) {
      this.setState({ value: '' });

      return;
    }

    // Handle the tab key
    if (event.keyCode === 9) return

    // Handle numbers and characters
    const key = String.fromCharCode(event.which);
    if (Number.isInteger(Number(key))) {
      this.setState({
        value: key
      }, () => {
        // Move focus to next input
        this.refs[(this.props.index + 1) % 6].focus()
      });
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  render() {
    // debugger
    // ref = { ref => this.refs[this.props.index] = ref }
    return (
      <div className="inputContainer">
        <input
          className="input"
          value={this.state.value}
          onChange={ () => {} }
          onKeyDown={this.handleKeyDown}
          maxLength="1"
        />
      </div>
    )
  }
}

export default ValidatorInput