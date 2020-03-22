import React from "react"
import PropTypes from "prop-types"
import mapboxgl from "mapbox-gl";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 11,
      locationName: 'City name here',
      map: null
    }

    this.handleCitySelect = this.handleCitySelect.bind(this)
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
    })

    this.setState({ map: map })
  }

  handleSaveLocation(){
    console.log("handleSaveLocation");
  }

  handleCitySelect(event){
    const currentLocation = event.currentTarget.value.split(",")
    this.setState({lng: currentLocation[0], lat: currentLocation[1]})
    this.state.map.setCenter({ lng: currentLocation[0], lat: currentLocation[1] })
  }

  render() {
    const countryList = this.props.cityList.map((city, i) => {
      return <option key={i} value={`${city.lng},${city.lat}`}>
              { city.name }
            </option>;
    })

    return (
      <>
        <select className="custom-select mb-2"
            value={`${this.state.lng},${this.state.lat}`}
            onChange={this.handleCitySelect}>
          {countryList}
        </select>
        <div
          ref={el => (this.mapContainer = el)}
          className="mapContainer mb-2"
        />
        <div className="text-left subtitle mb-5">{this.state.locationName}</div>
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
