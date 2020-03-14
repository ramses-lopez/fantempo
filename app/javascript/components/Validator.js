import React from "react"
import PropTypes from "prop-types"
import ErrorBoundary from "./ErrorBoundary"
import ValidatorInput from "./ValidatorInput"

class Validator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showValidator: true,
      code: null
    }
    this.sendCode = this.sendCode.bind(this)
    this.resendCode = this.resendCode.bind(this)
    this.handlePaste = this.handlePaste.bind(this)
  }

  sendCode() {
    this.setState({ showValidator: !this.state.showValidator })
  }

  resendCode() {
    this.setState({ showValidator: !this.state.showValidator })
  }

  handlePaste(event) {
    event.clipboardData.items[0].getAsString(text => {

      const code = text.split("").map((char, index) => {
        return Number.isInteger(Number(char)) ? Number(char) : ''
      })

      this.setState({ code: code })
    })
  }

  render() {
    const phoneInput = (
      <>
        <select>
          <option value="1">+1 USA</option>
          <option value="2">+2 Canada</option>
          <option value="3">+3 Mexico</option>
        </select>
        <input type="tel" maxLength="5"></input>
        <button onClick={this.sendCode}>Go</button>
      </>
    )

    const code = this.state.code

    const codeInput = (
      <React.Fragment>
        <div>
          <div className="container" onPaste={this.handlePaste}>
            <ValidatorInput value={code && code[0]} index={0} />
            <ValidatorInput value={code && code[1]} index={1} />
            <ValidatorInput value={code && code[2]} index={2} />
            <ValidatorInput value={code && code[3]} index={3} />
          </div>
        </div>

        <a href="#" onClick={this.resendCode}>
          Reenviar código
        </a>
      </React.Fragment>
    );

    return (
      <ErrorBoundary>
        {this.state.showValidator ? codeInput : phoneInput}
      </ErrorBoundary>
    )
  }
}

Validator.propTypes = {
  greeting: PropTypes.string
}

export default Validator
