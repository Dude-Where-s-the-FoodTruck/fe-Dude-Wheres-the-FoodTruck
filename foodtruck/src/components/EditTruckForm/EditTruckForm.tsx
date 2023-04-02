import './EditTruckForm.css';
import React from 'react';

interface EditTruckFormProps {}

interface EditTruckFormState {
  name: string;
  website: string;
  cuisine: string;
  photo: File | null;
  error: string | null;
}

export class EditTruckForm extends React.Component<EditTruckFormProps, EditTruckFormState> {
  constructor(props: EditTruckFormProps) {
    super(props);
    this.state = {
      name: '',
      website: '',
      cuisine: 'Select Cuisine',
      photo: null,
      error: null
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
    const file = event.target.files && event.target.files[0];
    this.setState({ photo: file });
  };

  handleCancel = () => {
    this.setState({ name: '', website: '', cuisine: 'Select Cuisine', photo: null, error: null });
  };


  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, website, cuisine, photo } = this.state;
  
    // Check if all fields are filled out
    if (!name || !website || cuisine === 'Select Cuisine' || !photo) {
      alert('Please fill out all fields');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('cuisine_type', cuisine);
    formData.append('web_link', website);
    formData.append('image', photo);
  
    try {
      const response = await fetch('https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks/1', {
        method: 'PATCH',
        body: formData,
      });
      const data = await response.json();
      console.log('Response:', data);
  
      // Clear fields on success
      this.setState({ name: '', website: '', cuisine: 'Select Cuisine', photo: null });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    return (
      <div className='edit-truck-container'>
        <h1 className='edit-header'>Edit Truck Info Below:</h1>
        <form className='owner-form' onSubmit={this.handleSubmit}>
          {this.state.error && <div className='error'>{this.state.error}</div>}
          <input
            className="name-input"
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
            placeholder='Truck Name'
          />
          <br />
          <input
            className="website-input"
            type="text"
            value={this.state.website}
            onChange={this.handleWebsiteChange}
            placeholder='Website Link'
          />
          <br />
          <input type="file" name="file" id="file" className="inputfile" onChange={this.handlePhotoChange} />
          <label htmlFor="file">Choose a file</label>
          <br />
          <div className='select'>
            <select value={this.state.cuisine} onChange={this.handleCuisineChange}>
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
          <div className='edit-truck-buttons'>
            <button className="cancel-button" type="button" onClick={this.handleCancel}>
              Cancel
            </button>
            <button className='submit-button' type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}