import "./FilterForm.css";
import React from "react";

interface FilterFormProps {}

class FilterForm extends React.Component<FilterFormProps> {
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
