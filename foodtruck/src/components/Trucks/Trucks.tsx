import './Trucks.css';
import { TruckCard, TruckCardProps } from '../TruckCard/TruckCard';
import { TruckData } from '../App/App';

export interface TrucksProps {
  truckData: TruckData[];
}

export const Trucks: React.FC<TrucksProps> = ({ truckData }) => {
  const truckCards = truckData.map((truck) => {
    const truckCardProps: TruckCardProps = {
      id: truck.id,
      name: truck.attributes.name,
      city: truck.relationships[0].attributes.city,
      date: truck.relationships[0].attributes.event_date,
      cuisine: truck.attributes.cuisine_type,
      website: truck.attributes.web_link,
      image: truck.attributes.image_link,
    };
    return <TruckCard {...truckCardProps} key={truck.id.toString()} />;
  });

  return <div className='trucks-container'>{truckCards}</div>;
};