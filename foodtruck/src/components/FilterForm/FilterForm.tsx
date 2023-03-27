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
        <div>
        </div>
    )
}
}

export default FilterForm;
