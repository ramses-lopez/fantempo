import React from "react"
import PropTypes from "prop-types"
import ErrorBoundary from "./ErrorBoundary"

class Validator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showValidator: true,
      input0: React.createRef(),
      input1: React.createRef(),
      input2: React.createRef()
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
      text.split("").forEach((char, i) => {
        const num = Number(char)
        if (!Number.isInteger(num)) return
        this.state[`input${i}`].current.value = this.state[`input${i}`] ? num : ""
      })
    })
  }

  handleFocus(event, nextNode, prevNode){
    const key = String.fromCharCode(event.which).toLowerCase()

    if ([9].includes(event.keyCode) || (event.metaKey || event.ctrlKey) && key === 'v') return

    event.preventDefault()

    if (!Number.isInteger(Number(key))) return

    //go back if backspace or delete
    if ([8, 46].includes(event.keyCode)) {
      event.target.value = ''
      if(prevNode !== null) prevNode.current.focus()
      return
    }

    if(Number.isInteger(Number(key))){
      event.target.value = key
      if (nextNode !== null) nextNode.current.focus()
    }
  }

  render() {
    const FancyInput = React.forwardRef((props, ref) => {
      return (
        <input
          index={props.index}
          ref={ref}
          className="child"
          onChange={props.onchangeHandler}
          onKeyDown={e => props.keyPressHandler(e, props.nextRef, props.prevRef)}
          maxLength="1"
          value={props.value}
        />
      )
    })

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

    const input0 = this.state.input0
    const input1 = this.state.input1
    const input2 = this.state.input2

    const codeInput = (
      <div className="parent" onPaste={this.handlePaste}>
        <FancyInput
          onPaste={this.handlePaste}
          ref={input0}
          prevRef={null}
          nextRef={input1}
          keyPressHandler={this.handleFocus}
        ></FancyInput>
        <FancyInput
          onPaste={this.handlePaste}
          ref={input1}
          prevRef={input0}
          nextRef={input2}
          keyPressHandler={this.handleFocus}
        ></FancyInput>
        <FancyInput
          onPaste={this.handlePaste}
          ref={input2}
          prevRef={input1}
          nextRef={null}
          keyPressHandler={this.handleFocus}
        ></FancyInput>
      </div>
    )

    return (
      <ErrorBoundary>
        <div>876</div>
        <div>ABC</div>
        {this.state.showValidator ? codeInput : phoneInput}
      </ErrorBoundary>
    )
  }
}

Validator.propTypes = {
  greeting: PropTypes.string
}

export default Validator
