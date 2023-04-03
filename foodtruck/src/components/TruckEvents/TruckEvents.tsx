import "./TruckEvents.css";
import React from "react";
import { Truck } from "../App/App";
import { TruckEventCard } from "../TruckEventCard/TruckEventCard";

interface TruckEventsProps {
  ownerTrucks: Truck[];
}

export const TruckEvents: React.FC<TruckEventsProps> = ({ ownerTrucks }) => {
  const truckEventCards = ownerTrucks.map((truck) => {
    const events = truck.attributes.events || []; // handle case when events is null or undefined
    const eventCardPropsList = events.map((event, index) => {
        return {
            key: `${truck.id}-${index}`,
            id: parseInt(truck.id),
            name: truck.attributes.name,
            city: event.city || '',
            date: event.event_date || '',
          };
        });
        return (
          <React.Fragment key={truck.id}>
            {eventCardPropsList.map((props) => (
              <TruckEventCard {...props} />
            ))}
          </React.Fragment>
        );
      });

  return (
    <div className="truck-events-container">
        <div className="truck-event-header">
            <h1>Upcoming Events</h1>
        </div>
        <div className="all-events-container">
            {truckEventCards}
        </div>
    </div>
  );
};

