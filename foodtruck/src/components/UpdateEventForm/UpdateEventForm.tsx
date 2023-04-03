import "./UpdateEventForm.css";
import React from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { Truck } from "../App/App";

interface UpdateEventFormProps {
  ownerTrucks: Truck[];
  fetchTrucks: () => Promise<void>;
}

interface EventData {
  event_date: string;
  start_time: string;
  end_time: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  city: string;
}

interface ResponseData {
  data: {
    id: number;
    attributes: EventData;
    relationships: { foodtruck_id: number };
  };
}

export const UpdateEventForm: React.FC<UpdateEventFormProps> = ({ ownerTrucks, fetchTrucks, }) => {
  console.log(ownerTrucks)
  const history = useHistory();
  const { eventId } = useParams<{ eventId: string }>();
  const event = ownerTrucks[0].attributes.events.find((e) => e.id === Number(eventId));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      location: {
        street: (document.getElementById("street") as HTMLInputElement).value,
        city: (document.getElementById("city") as HTMLInputElement).value,
        state: (document.getElementById("state") as HTMLInputElement).value,
        zip: (document.getElementById("zip") as HTMLInputElement).value,
      },
      city: (document.getElementById("city") as HTMLInputElement).value,
    };
    console.log(eventData)
    const url = `https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks/${ownerTrucks[0].id}/events/${eventId}`;
    console.log(eventData)
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const responseData: ResponseData = await response.json();
        console.log(responseData);
        (document.getElementById("event_date") as HTMLInputElement).value = "";
        (document.getElementById("start_time") as HTMLInputElement).value = "";
        (document.getElementById("end_time") as HTMLInputElement).value = "";
        (document.getElementById("description") as HTMLInputElement).value = "";
        (document.getElementById("street") as HTMLInputElement).value = "";
        (document.getElementById("city") as HTMLInputElement).value = "";
        (document.getElementById("state") as HTMLInputElement).value = "";
        (document.getElementById("zip") as HTMLInputElement).value = "";
        history.push("/owner");
        fetchTrucks()

      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="update-form-wrapper-container">
      <div className="event-details">
        
        {event && (
          <div>
            <h3>Current Event Details</h3>
            <p>City: {event.city}</p>
            <p>Description: {event.description}</p>
            <p>Event Date: {event.event_date}</p>
            <p>Start Time: {event.start_time}</p>
            <p>End Time: {event.end_time}</p>
          </div>
        )}
      </div>
      <div className="update-back-home">
        <Link to="/owner">
          <button className="back-to-owner">Back to Home</button>
        </Link>
      </div>
      <div className="update-form-container">
        <div className="update-form-wrapper">
          <form onSubmit={handleSubmit} className="update-form">
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
              <label htmlFor="zip">Zip:</label>
              <input type="text" id="zip" name="zip" required />
            </div>
            <button className="submit-event" type="submit">
              Update Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};