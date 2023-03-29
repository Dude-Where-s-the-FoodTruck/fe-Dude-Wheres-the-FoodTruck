import React from 'react';
import './TruckDetails.css';
import { TruckData } from '../App/App';

interface TruckDetailsProps {
  match: {
    params: {
      name: string
    }
  },
  truckData: TruckData[]
}

interface TruckDetailsState {
  truck: TruckData | null
}

class TruckDetails extends React.Component<TruckDetailsProps, TruckDetailsState> {
  state: TruckDetailsState = {
    truck: null
  }

  componentDidMount(): void {
    const truckName = this.props.match.params.name;
    const truck = this.props.truckData.find(t => t.attributes.name === truckName);
    if (truck) {
      this.setState({ truck });
    }
  }
  
  render() {
    const { truck } = this.state;
    if (!truck) {
      return <div>Loading...</div>;
    }
    return (
      <div className="TruckDetails">
        <h1>{truck.attributes.name}</h1>
        <h3>Food Type: {truck.attributes.cuisine_type}</h3>
        <p>Where?: {truck?.relationships[0].attributes.city}</p>
        <p>Description of Location: {truck?.relationships[0].attributes.description}</p>
        <a href={truck.attributes.web_link} target="_blank" rel="noreferrer">{truck.attributes.web_link}</a>
      </div>
    );
  }
}

export default TruckDetails;