import { Truck } from "../App/App";
import { TruckCard, TruckCardProps } from "../TruckCard/TruckCard";
import "./Trucks.css";

interface TrucksProps {
  truckData: Truck[];
  city: string;
}

export const Trucks = ({ truckData, city }: TrucksProps) => {
  let filteredTrucks = truckData;
  if (city) {
    filteredTrucks = truckData.filter((truck) =>
      truck.attributes.events.some((event) => event.city === city)
    );
  }
  const truckCards: JSX.Element[] = filteredTrucks.flatMap((truck: Truck) => {
    const { events } = truck.attributes;
    return events
      .filter((event: any) => !city || event.city === city)
      .map((event: any) => {
        const cardProps: TruckCardProps = {
          foodTruckId: truck.id,
          eventId: event.id,
          truckName: truck.attributes.name,
          truckImageLink: truck.attributes.image_link,
          city: event.city ?? "Unknown City",
          date: event.event_date,
        };
        return <TruckCard key={`${truck.id}_${event.id}`} {...cardProps} />;
      });
  });

  return <div className="trucks-container">{truckCards}</div>;
};
