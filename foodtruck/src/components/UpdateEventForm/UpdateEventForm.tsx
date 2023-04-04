import "./UpdateEventForm.css";
import React from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { Truck } from "../App/App";

interface UpdateEventFormProps {
  ownerTrucks: Truck[];
  fetchTrucks: () => Promise<void>;
}

export const UpdateEventForm: React.FC<UpdateEventFormProps> = ({
  ownerTrucks,
  fetchTrucks,
}) => {
  const history = useHistory();
  const { eventId } = useParams<{ eventId: string }>();
  const event = ownerTrucks[0].attributes.events.find(
    (e) => e.id === Number(eventId)
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const eventDateInput = document.getElementById("event_date") as HTMLInputElement;
    const locationInput = document.getElementById("street") as HTMLInputElement;
    const startTimeInput = document.getElementById("start_time") as HTMLInputElement;
    const endTimeInput = document.getElementById("end_time") as HTMLInputElement;
    const descriptionInput = document.getElementById("description") as HTMLInputElement;
    const cityInput = document.getElementById("city") as HTMLInputElement;
  
    const formData = new FormData();
  
    if (eventDateInput.value) {
      formData.append("event_date", eventDateInput.value)
    }
  
    if (locationInput.value) {
      formData.append("location", locationInput.value)
    }
  
    if (startTimeInput.value) {
      formData.append("start_time", startTimeInput.value)
    }
  
    if (endTimeInput.value) {
      formData.append("end_time", endTimeInput.value)
    }
  
    if (descriptionInput.value) {
      formData.append("description", descriptionInput.value)
    }
  
    if (cityInput.value) {
      formData.append("city", cityInput.value)
    }
  
    const url = `https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks/${ownerTrucks[0].id}/events/${eventId}`;
  
    try {
      const response = await fetch(url, {
        method: "PATCH",
        body: formData,
      });

      await response.json();
      if (response.ok) {
        eventDateInput.value = "";
        startTimeInput.value = "";
        endTimeInput.value = "";
        descriptionInput.value = "";
        locationInput.value = "";
        cityInput.value = "";
  
        history.push("/owner");
        fetchTrucks();
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="event-details">
        {event && (
          <div className="current-event-details">
            <h3>Current Event Details</h3>
            <p>City: {event.city}</p>
            <p>Description: {event.description}</p>
            <p>Event Date: {event.event_date}</p>
            <p>Start Time: {event.start_time}</p>
            <p>End Time: {event.end_time}</p>
          </div>
        )}
      </div>
        <div className="update-form-wrapper">
          <form onSubmit={handleSubmit} className="update-form">
            <div className="form-group">
              <label htmlFor="event_date">Event Date:</label>
              <input type="date" id="event_date" name="event_date" />
            </div>
            <div className="form-group">
              <label htmlFor="start_time">Start Time:</label>
              <input type="time" id="start_time" name="start_time" />
            </div>
            <div className="form-group">
              <label htmlFor="end_time">End Time:</label>
              <input type="time" id="end_time" name="end_time" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Location Description:</label>
              <textarea
                id="description"
                className="text-area"
                name="description"
                style={{ resize: "none" }}
                maxLength={200}
              />
            </div>
            <div className="form-group">
              <label htmlFor="street">Street Address:</label>
              <input type="text" id="street" name="street" />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input type="text" id="city" name="city" />
            </div>
            <button className="submit-event" type="submit">
              Update Event
            </button>
          </form>
        </div>
    </>
  );
};
