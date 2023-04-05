import React from "react";
import { useHistory, Link } from "react-router-dom";
import { Truck } from "../App/App";

interface CreateEventFormProps {
  ownerTrucks: Truck[];
  fetchTrucks: () => Promise<void>;
}

interface EventData {
  event_date: string;
  location: string;
  start_time: string;
  end_time: string;
  description: string;
  city: string;
}


export const CreateEventForm: React.FC<CreateEventFormProps> = ({
  ownerTrucks,
  fetchTrucks,
}) => {
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const truck_id = (document.getElementById("foodtruck") as HTMLSelectElement)
      .value;

    const eventData: EventData = {
      event_date: (document.getElementById("event_date") as HTMLInputElement)
        .value,
      start_time: (document.getElementById("start_time") as HTMLInputElement)
        .value,
      end_time: (document.getElementById("end_time") as HTMLInputElement).value,
      description: (document.getElementById("description") as HTMLInputElement)
        .value,
      location: (document.getElementById("street") as HTMLInputElement).value,
      city: (document.getElementById("city") as HTMLInputElement).value,
    };

    const url = `https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks/${truck_id}/events`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        (document.getElementById("foodtruck") as HTMLSelectElement
        ).selectedIndex = 0;
        (document.getElementById("event_date") as HTMLInputElement).value = "";
        (document.getElementById("start_time") as HTMLInputElement).value = "";
        (document.getElementById("end_time") as HTMLInputElement).value = "";
        (document.getElementById("description") as HTMLInputElement).value = "";
        (document.getElementById("street") as HTMLInputElement).value = "";
        (document.getElementById("city") as HTMLInputElement).value = "";
        await response.json();
        fetchTrucks();

        history.push("/owner");
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      alert(error);
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
              <label htmlFor="description">Event Description:</label>
              <textarea
                id="description"
                name="description"
                rows={3}
                maxLength={140}
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
              <button type="submit">Create Event</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
