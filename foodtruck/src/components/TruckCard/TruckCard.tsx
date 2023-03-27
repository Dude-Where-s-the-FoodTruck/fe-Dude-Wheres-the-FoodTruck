import './TruckCard.css'
import { Link } from "react-router-dom";

interface TruckCardProps {
    id: number;
    name: string;
    cuisine: string;
    website: string;
    image: string;
  }

export const TruckCard: React.FC<TruckCardProps> = ({ id, name, cuisine, website, image }) => {
    return (
        <Link to={`/foodtruck/${name}`} style={{ textDecoration: "none", width: "300px", height: "400px" }}>
            <div className='card-container' style={{ backgroundImage: `url(${image})`}}>
                <h3 className='truck-name'>{name}</h3>
            </div>
        </Link>
    )
}