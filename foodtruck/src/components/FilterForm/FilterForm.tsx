import "./FilterForm.css";
import React from "react";
import { TruckData } from "../App/App";

interface FilterFormProps {
  truckData: TruckData[];
  filter: (city: string) => void;
  filteredTrucks: TruckData[];
  reset: () => void;
}

interface FilterFormState {
  city: string;
}

class FilterForm extends React.Component<FilterFormProps, FilterFormState> {
  constructor(props: FilterFormProps) {
    super(props);
    this.state = {
      city: "",
    };
  }

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { city } = this.state;
    const { filter } = this.props;
    filter(city);
    this.setState({city:""})
  };

  handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { reset } = this.props;
    reset();
    this.setState({city:""})
  };

  render() {
    const { truckData } = this.props;
    const cities = [
      ...new Set(
        [...truckData]
          .map((truck: TruckData) =>
            truck.relationships.map(
              (relationship) => relationship.attributes.city
            )
          )
          .flat()
      ),
    ];

    return (
      <div className="form-container">
        <label>Choose a city:</label>
        <select
          className="drop-down"
          onChange={(event) => this.setState({ city: event.target.value })}
          name="city"
          id="city"
          value={this.state.city}
        >
          <option value="" disabled></option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <button className="submit-state" onClick={this.handleClick}>
          Submit
        </button>
        <button className="reset-button" onClick={this.handleReset}>
          Reset
        </button>
      </div>
    );
  }
}


export default FilterForm