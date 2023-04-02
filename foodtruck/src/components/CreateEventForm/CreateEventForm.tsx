import "./CreateEventForm.css";
import React from "react";
import { useHistory, Link } from "react-router-dom";
import { Truck } from "../App/App";

interface CreateEventFormProps {
  ownerTrucks: Truck[];
}

interface EventData {
  event_date: string;
  start_time: string;
  end_time: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

interface ResponseData {
  data: {
    attributes: EventData;
    relationships: { foodtruck_id: number };
  };
}

export const CreateEventForm: React.FC<CreateEventFormProps> = ({
  ownerTrucks,
}) => {
  console.log(ownerTrucks);
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const eventData: EventData = {
        event_date: (document.getElementById("event_date") as HTMLInputElement)
          .value,
        start_time: (document.getElementById("start_time") as HTMLInputElement)
          .value,
        end_time: (document.getElementById("end_time") as HTMLInputElement)
          .value,
        description: (
          document.getElementById("description") as HTMLInputElement
        ).value,
        address: {
          street: (document.getElementById("street") as HTMLInputElement).value,
          city: (document.getElementById("city") as HTMLInputElement).value,
          state: (document.getElementById("state") as HTMLInputElement).value,
          zip: (document.getElementById("zip") as HTMLInputElement).value,
        },
      };

      const response: ResponseData = {
        data: {
          attributes: eventData,
          relationships: { foodtruck_id: 1 }, // Replace 1 with the actual food truck ID
        },
      };

      console.log(response.data);
      history.push("/owner"); // Replace with the actual route to go to after submission
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-form-wrapper-container">
      <div className="create-back-home">
        <Link to="/owner">
          <button className="back-to-owner">Back to Home</button>
        </Link>
      </div>
      <div className="create-form-container">
        <div className="create-form-wrapper">
          <form onSubmit={handleSubmit} className="create-form">
            <div className="form-group">
                <label htmlFor="foodtruck">Select Truck:</label>
                <select id="foodtruck" name="foodtruck">
                    {ownerTrucks.map((truck) => (
                    <option value={truck.id} key={truck.id}>
                        {truck.attributes.name}
                    </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
              <label htmlFor="event_date">Event Date:</label>
              <input type="date" id="event_date" name="event_date" required />
            </div>
            <div className="form-group">
              <label htmlFor="start_time">Start Time:</label>
              <input type="time" id="start_time" name="start_time" required />
            </div>
            <div className="form-group">
              <label htmlFor="end_time">End Time:</label>
              <input type="time" id="end_time" name="end_time" required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Location Description:</label>
              <textarea
                id="description"
                className="text-area"
                name="description"
                style={{ resize: "none" }}
                maxLength={200}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="street">Street Address:</label>
              <input type="text" id="street" name="street" required />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input type="text" id="city" name="city" required />
            </div>
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input type="text" id="state" name="state" required />
            </div>
            <div className="form-group">
              <label htmlFor="zip">Zip Code:</label>
              <input type="text" id="zip" name="zip" required />
            </div>
            <div className="create-button-container">
              <button type="submit" className="create-button">
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
