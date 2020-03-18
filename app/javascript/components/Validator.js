import React from "react"
import ErrorBoundary from "./ErrorBoundary"

class Validator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneList: props.phoneList,
      showValidator: false,
      input0: React.createRef(),
      input1: React.createRef(),
      input2: React.createRef(),
      input3: React.createRef()
    }

    this.sendCode = this.sendCode.bind(this)
    this.resendCode = this.resendCode.bind(this)
    this.handlePaste = this.handlePaste.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
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
          className="validator-digit"
          onChange={props.onchangeHandler}
          onKeyDown={e =>
            props.keyPressHandler(e, props.nextref, props.prevref)
          }
          maxLength="1"
          value={props.value}
          {...props}
        />
      );
    })

    const countryPhoneList = this.state.phoneList.map((country, i) => {
      return (<option key={i} value={country.phone_country_code}>
                {country.flag} +{country.phone_country_code}
              </option>)
    })

    const phoneInput = (
      <div className="d-flex flex-column">
        <div className="text-left mb-5">
          Ingresa tu número de teléfono y sé el primero en enterarte del show
        </div>
        <div className="input-group mb-2">
          <select className="custom-select country-list" onChange={() => {}}>
            {countryPhoneList}
          </select>
          <div className="input-group-append">
            <input className="form-control" type="tel" maxLength="10"></input>
          </div>
        </div>
        <div className="help-text text-left mb-5">
          Utilizaremos tu número para validar tu identidad
        </div>

        <button className="btn btn-primary" onClick={this.sendCode}>
          Validar
        </button>
      </div>
    );

    const { input0, input1, input2, input3 } = this.state

    const codeInput = (
      <>
        <div className="subtitle">
          Ingresa el código que te envíamos vía SMS
        </div>
        <div
          className="d-flex flex-row justify-content-around text-left validator-container"
          onPaste={this.handlePaste}
        >
          <FancyInput
            onPaste={this.handlePaste}
            ref={input0}
            prevref={null}
            nextref={input1}
            keyPressHandler={this.handleFocus}
          ></FancyInput>
          <FancyInput
            onPaste={this.handlePaste}
            ref={input1}
            prevref={input0}
            nextref={input2}
            keyPressHandler={this.handleFocus}
          ></FancyInput>
          <FancyInput
            onPaste={this.handlePaste}
            ref={input2}
            prevref={input1}
            nextref={input3}
            keyPressHandler={this.handleFocus}
          ></FancyInput>
          <FancyInput
            onPaste={this.handlePaste}
            ref={input3}
            prevref={input2}
            nextref={null}
            keyPressHandler={this.handleFocus}
          ></FancyInput>
        </div>
        <div className="subtitle text-center">
          <span>No recibí el código. </span>
          <a href="javascript:void(0)" onClick={this.resendCode}>
            Reenviar
          </a>
        </div>
      </>
    );

    return (
      <ErrorBoundary>
        {this.state.showValidator ? codeInput : phoneInput}
      </ErrorBoundary>
    );
  }
}

export default Validator
