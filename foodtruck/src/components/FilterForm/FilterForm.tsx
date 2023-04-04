import "./FilterForm.css";
import React, { Component } from "react";
import { Truck } from "../App/App";

interface FilterFormProps {
  truckData: {
    data: Truck[];
  };
  filter: (city: string) => void;
  filteredTrucks: Truck[];
  reset: () => void;
}

interface FilterFormState {
  city: string;
}

class FilterForm extends Component<FilterFormProps, FilterFormState> {
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
    this.setState({ city: "" });
  };

  handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { reset } = this.props;
    reset();
    this.setState({ city: "" });
  };

  render() {
    const { truckData, filteredTrucks } = this.props;
    const cities = [
      ...new Set(
        filteredTrucks.length > 0
          ? filteredTrucks.flatMap((truck: Truck) =>
              truck.attributes.events.map((event: any) => event.city)
            )
          : truckData.data.flatMap((truck: Truck) =>
              truck.attributes.events.map((event: any) => event.city)
            )
      ),
    ].filter((city) => city !== null);

    return (
      <div className="form-container">
        <div className="select">
          <label>
            <strong>Choose a city:</strong>
          </label>
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
        </div>
        <div className="button-box">
          <button className="submit-state" onClick={this.handleClick}>
            Submit
          </button>
          <button className="reset-button" onClick={this.handleReset}>
            Back To All
          </button>
        </div>
      </div>
    );
  }
}

export default FilterForm;
