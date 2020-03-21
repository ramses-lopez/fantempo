import React from "react"
import PropTypes from "prop-types"
class Map extends React.Component {
  render () {
    return (
      <React.Fragment>
        Mapbox Token: {this.props.mapboxToken}
      </React.Fragment>
    );
  }
}

Map.propTypes = {
  mapboxToken: PropTypes.string
};
export default Map
