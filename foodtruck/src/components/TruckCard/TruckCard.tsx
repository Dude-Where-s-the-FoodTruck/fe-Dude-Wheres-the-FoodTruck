import './TruckCard.css'
import { Link } from "react-router-dom";

interface TruckCardProps {
    id:number;
    name:string;
    date:string
}

export const TruckCard: React.FC<TruckCardProps> = ({ id, name, date }) => {
    return (
        <Link to={`/breweries/${id}`} style={{ textDecoration: "none", width: "300px", height: "400px" }}>
            <div>
                <h3>{name}</h3>
                <p>{date}</p>
            </div>
        </Link>
    )
}