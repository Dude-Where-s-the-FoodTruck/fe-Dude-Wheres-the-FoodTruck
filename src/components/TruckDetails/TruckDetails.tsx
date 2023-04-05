import React from "react";
import "./TruckDetails.css";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Link } from "react-router-dom";
import { Truck } from "../App/App";

interface TruckDetailsProps {
  match: {
    params: {
      foodtruckID: string;
      eventId: string;
    };
  };
  truckData: { data: Truck[] };
}

interface TruckDetailsState {
  truck: Truck | null;
  isLoading: boolean;
  error?: Error;
}

class TruckDetails extends React.Component<
  TruckDetailsProps,
  TruckDetailsState
> {
  state: TruckDetailsState = {
    truck: null,
    isLoading: true,
  };

  componentDidMount(): void {
    const { foodtruckID, eventId } = this.props.match.params;
    const apiUrl = `https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks/${foodtruckID}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const truck = {
          id: data.data.id,
          type: "truck",
          attributes: data.data.attributes,
          relationships: Array.isArray(data.data.relationships)
            ? data.data.relationships.filter(
                (event: { id: string }) => event.id === eventId
              )
            : [],
        };
        this.setState({ truck, isLoading: false });
        localStorage.setItem("truck", JSON.stringify(truck));
      })
      .catch((error) => {
        alert(error);
        this.setState({ error, isLoading: false });
      });
  }

  render() {
    const MAPBOX_TOKEN =
      "pk.eyJ1IjoiamF5c21pdGg2MDM1IiwiYSI6ImNsZXEzMDZzODA5NGIzc3BoNTZxeTcyNGUifQ.o85HEkHjse8_WF-O5_d7jg";
    const { truck, isLoading, error } = this.state;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>{error.message}</div>;
    }
    const events = truck?.attributes?.events ?? [];
    const { eventId } = this.props.match.params;
    const event = events.find((e) => e.id === parseInt(eventId));
    return (
      <div className="all-details-wrapper">
        <div>
          <Link to="/main" style={{textDecoration: "none"}}>
            <div className="go-to-events-wrapper">
              <button className="go-to-events">Back to Events</button>
            </div>
          </Link>
        </div>
        <div className="TruckDetails">
          <span className="not-map">
            {truck && (
              <div className="grouped-truck-details">
                <img
                  className="truck-image"
                  src={truck.attributes.image_link}
                  alt="Food Truck Logo"
                />
                <h1>{truck.attributes.name}</h1>
                <p>
                  <strong>Food Type:</strong> {truck.attributes.cuisine_type}
                </p>
                <p>
                  <strong>Where?:</strong> {event?.city}
                </p>
                <p>
                  <strong>Description of Location:</strong> {event?.description}
                </p>
                <a
                  className="weblink-button"
                  href={truck.attributes.web_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit The Website
                </a>
              </div>
            )}
          </span>
          <span className="map">
            <p>
              <strong>We Are Here!</strong>
            </p>
            <div
              style={{ border: "1px solid black", width: "30vw", height: "30vw" }}
            >
              <Map
                initialViewState={{
                  latitude: event?.latitude ?? 0,
                  longitude: event?.longitude ?? 0,
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
                  longitude={event?.longitude ?? 0}
                  latitude={event?.latitude ?? 0}
                  color="red"
                />
              </Map>
            </div>
          </span>
        </div>
      </div>
    );
  }
}

export default TruckDetails;
