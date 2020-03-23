import React from "react"
import PropTypes from "prop-types"
import mapboxgl from "mapbox-gl";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 9,
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

    map.on("load", () => {

      // map.loadImage("https://i.imgur.com/MK4NUzI.png", (error, image) => {
      //   if (error) throw error
      //   map.addImage("custom-marker", image)
      //   // A style layer ties together the source and image and specifies how they are displayed on the map.
      //   map.addLayer({
      //     id: "markers",
      //     type: "symbol",
      //     // A data source specifies the geographic coordinate where the image marker gets placed.
      //     source: {
      //       type: "geojson",
      //       data: {
      //         type: 'FeatureCollection',
      //         features: [
      //           {
      //             type: 'Feature',
      //             properties: {},
      //             geometry: {
      //               type: "Point",
      //               coordinates: [this.state.lng, this.state.lat]
      //             }
      //           },
      //         ]
      //       }
      //     },
      //     layout: {
      //       "icon-image": "custom-marker",
      //     }
      //   })
      // })

      map.addSource("source_circle_500", {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": [{
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [0, 0]
            }
          }]
        }
      })

      map.addLayer({
        "id": "circle500",
        "type": "circle",
        "source": "source_circle_500",
        "layout": {
          "visibility": "none"
        },
        "paint": {
          "circle-radius": 1000000,
          "circle-color": "#000000",
          "circle-opacity": 1
        }
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
      return  <option key={i} value={`${city.lng},${city.lat}`}>
                { city.name }
              </option>
    })

    return (
      <div className="d-flex flex-column justify-content-center">
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
        <button className="btn btn-primary" onClick={this.handleSaveLocation}>
          Aceptar
        </button>
      </div>
    )
  }
}

Map.propTypes = {
  mapboxToken: PropTypes.string
};

export default Map
