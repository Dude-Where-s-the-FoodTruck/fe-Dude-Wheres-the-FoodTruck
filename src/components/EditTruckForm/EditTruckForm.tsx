import "./EditTruckForm.css";
import React from "react";
import { Truck } from "../App/App";

interface EditTruckFormProps {
  fetchTrucks: () => Promise<void>;
  filteredOwnerTrucks: Truck[];
}

interface EditTruckFormState {
  name: string;
  website: string;
  cuisine: string;
  photo: string;
  error: string | null;
}

export class EditTruckForm extends React.Component<
  EditTruckFormProps,
  EditTruckFormState
> {
  constructor(props: EditTruckFormProps) {
    super(props);
    this.state = {
      name: "",
      website: "",
      cuisine: "Select Cuisine",
      photo: "",
      error: null,
    };
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value });
  };

  handleWebsiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ website: event.target.value });
  };

  handleCuisineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ cuisine: event.target.value });
  };

  handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ photo: event.target.value });
  };

  handleCancel = () => {
    this.setState({
      name: "",
      website: "",
      cuisine: "Select Cuisine",
      photo: "",
      error: null,
    });
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, website, cuisine, photo } = this.state;
    const truckId = this.props.filteredOwnerTrucks[0].id;

    const formData = new FormData();
    if (name) {
      formData.append("name", name);
    }
    if (website) {
      formData.append("web_link", website);
    }
    if (cuisine !== "Select Cuisine") {
      formData.append("cuisine_type", cuisine);
    }
    if (photo) {
      formData.append("image_link", photo);
    }

    try {
      const response = await fetch(
        `https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks/${truckId}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      await response.json();
      this.props.fetchTrucks();
      this.setState({
        name: "",
        website: "",
        cuisine: "Select Cuisine",
        photo: "",
      });
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <div className="edit-truck-container">
        <h1 className="edit-header">Edit Truck Info Below:</h1>
        <form className="owner-form" onSubmit={this.handleSubmit}>
          {this.state.error && <div className="error">{this.state.error}</div>}
          <input
            className="name-input"
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
            placeholder="Truck Name"
          />
          <br />
          <input
            className="website-input"
            type="text"
            value={this.state.website}
            onChange={this.handleWebsiteChange}
            placeholder="Website Link"
          />
          <br />
          <input
            className="input-photo"
            type="text"
            value={this.state.photo}
            onChange={this.handlePhotoChange}
            placeholder="Photo Link"
          />
          <br />
          <div className="select">
            <select
              className="select-type"
              value={this.state.cuisine}
              onChange={this.handleCuisineChange}
            >
              <option disabled>Select Cuisine</option>
              <option>Spanish</option>
              <option>French</option>
              <option>Italian</option>
              <option>Japanese</option>
              <option>Greek</option>
              <option>Vegan</option>
              <option>Fusion</option>
              <option>German</option>
            </select>
          </div>
          <br />
          <div className="edit-truck-buttons">
            <button
              className="cancel-button"
              type="button"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
            <button className="submit-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
