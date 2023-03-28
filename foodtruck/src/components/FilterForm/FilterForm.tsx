import "./FilterForm.css";
import React from "react";
import { TruckData } from '../App/App';

interface FilterFormState {
  city: string;
}

export interface FilterFormProps {
  
}

class FilterForm extends React.Component<FilterFormProps, FilterFormState> {
  constructor(props: FilterFormProps) {
    super(props);
    this.state = {
      city: "",
    };
  }
  render() {
    return (
        <div className="form-container">
          <label>Choose a city:</label>
          <select
          className="drop-down"
          //onChange={(event) => this.setState({city: event.target.value})}
          name="city"
          id="city"
          //value={this.state.city}
          >
          <option value="" disabled></option>
          <option></option>
          </select>
        </div>
    )
}
}

export default FilterForm;
