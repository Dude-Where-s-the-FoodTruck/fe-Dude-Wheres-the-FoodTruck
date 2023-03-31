import React from 'react';
import './TruckDetails.css';
import { TruckData } from '../App/App';
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Link } from "react-router-dom";

interface TruckDetailsProps {
  match: {
    params: {
      name: string
    }
  },
  truckData: TruckData[]
}

interface TruckDetailsState {
  truck: TruckData | null;
  isLoading: boolean;
}

class TruckDetails extends React.Component<TruckDetailsProps, TruckDetailsState> {
  state: TruckDetailsState = {
    truck: null,
    isLoading: true,
  }

  componentDidMount(): void {
    const truckName = this.props.match.params.name;
    const truck = this.props.truckData.find(t => t.attributes.name === truckName);
    if (truck) {
      this.setState({ truck, isLoading: false });
      localStorage.setItem('truck', JSON.stringify(truck));
    } else {
      const truckDataFromStorage = localStorage.getItem('truck');
      if (truckDataFromStorage) {
        this.setState({ truck: JSON.parse(truckDataFromStorage), isLoading: false });
      }
    }
  }
  
  render() {
    const MAPBOX_TOKEN = "pk.eyJ1IjoiamF5c21pdGg2MDM1IiwiYSI6ImNsZXEzMDZzODA5NGIzc3BoNTZxeTcyNGUifQ.o85HEkHjse8_WF-O5_d7jg"
    const { truck } = this.state;
    if (!truck) {
      return <div>Loading...</div>;
    }
    return (
      <div className="TruckDetails">
        <span className='not-map'>
          <Link to="/main">
            <button className="go-to-events">Back to Events</button>
          </Link>
          <img className="truck-image" src={truck.attributes.image_link} alt="Food Truck Logo"/>
          <h1>{truck.attributes.name}</h1>
          <p><strong>Food Type:</strong> {truck.attributes.cuisine_type}</p>
          <p><strong>Where?:</strong> {truck?.relationships[0].attributes.city}</p>
          <p><strong>Description of Location:</strong> {truck?.relationships[0].attributes.description}</p>
          <a className="weblink-button" href={truck.attributes.web_link} target="_blank" rel="noopener noreferrer">Visit The Website</a>
        </span>
        <span className='map'>
          <p><strong>We Are Here!</strong></p>
          <div style={{ border: "1px solid black", width: "30vw", height: "30vw" }}>
        <Map
            initialViewState={{
              latitude: truck.relationships[0].attributes.latitude,
              longitude: truck.relationships[0].attributes.longitude,
              zoom: 18,
            }}
            style={{
              width: "30vw",
              height: "30vw",
            }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            <Marker
              longitude={truck.relationships[0].attributes.longitude}
              latitude={truck.relationships[0].attributes.latitude}
              color="red"
            />
          </Map>
          </div>
        </span>
      </div>
    );
  }
}

export default TruckDetails;