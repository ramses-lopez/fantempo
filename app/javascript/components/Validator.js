import React from "react"
import PropTypes from "prop-types"
class Validator extends React.Component {

  handleClick(){
    console.log('click')

    fetch('/sessions/create', {method: "GET"})
      .then(x => x.json())
      .then(x => console.log(x))
    .catch(x => {
      console.error(x)
    })
  }

  render () {
    return (
      <React.Fragment>
        Greeting: {this.props.greeting}
        <button onClick={this.handleClick}>Go</button>
      </React.Fragment>
    );
  }
}

Validator.propTypes = {
  greeting: PropTypes.string
};
export default Validator
