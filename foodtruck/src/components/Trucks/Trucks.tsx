import './Trucks.css'
import { TruckCard } from '../TruckCard/TruckCard';

export interface TrucksProps {
    truckData: {
        data: {
            id: number;
            attributes: {
                name: string;
                cuisine_type: string;
                web_link: string;
                image_link: string;
            };
        }[];
    }[];
}


export const Trucks: React.FC<TrucksProps> = ({ truckData }) => {
    const dataFix = truckData.map((truck) => truck.data[0])
    const truckCards = dataFix.map((truck) => {
        return(
            <TruckCard 
                id={truck.id}
                name={truck.attributes.name}
                cuisine={truck.attributes.cuisine_type}
                website={truck.attributes.web_link}
                image={truck.attributes.image_link}
                key={truck.id}
            />
        )
    })
    return (
        <div className='trucks-container'>
              {truckCards}
        </div>
    )
}