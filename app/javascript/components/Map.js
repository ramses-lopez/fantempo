import React from "react"
import PropTypes from "prop-types"
import mapboxgl from "mapbox-gl";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 5
    };
  }

  componentDidMount() {
    mapboxgl.accessToken = this.props.mapboxToken

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    })

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      })

      console.log(this.state.lng, this.state.lat)
    })
  }

  handleSaveLocation(){
    console.log("handleSaveLocation");
  }

  render() {
    const countryList = [
      <option key="0">Toronto, Canada</option>,
      <option key="1">Miami, USA</option>,
      <option key="2">Madrid, Spain</option>
    ]

    const locationName = "Toronto y alrededores (10 km)"

    return (
      <>
        <select className="custom-select mb-2" value={1} onChange={() => {}}>
          {countryList}
        </select>
        <div
          ref={el => (this.mapContainer = el)}
          className="mapContainer mb-2"
        />
        <div className="text-left subtitle mb-5">{locationName}</div>
        <button className="btn btn-primary" onClick={ this.handleSaveLocation }>
          Aceptar
        </button>
      </>
    );
  }
}

Map.propTypes = {
  mapboxToken: PropTypes.string
};

export default Map
