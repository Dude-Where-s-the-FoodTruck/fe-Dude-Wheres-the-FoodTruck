import "./TruckCard.css";
import { Link } from "react-router-dom";

export interface TruckCardProps {
  foodTruckId: string;
  eventId: number;
  truckName: string;
  truckImageLink: string;
  city: string;
  date: string
}

export const TruckCard: React.FC<TruckCardProps> = ({
  foodTruckId,
  eventId,
  truckName,
  truckImageLink,
  city,
  date,
}) => {
  return (
    <Link to={`/foodtruck/${foodTruckId}/${eventId}`} style={{ textDecoration: "none", width: "300px", height: "400px" }}>
      <div className="card-info">
      <div
          className="card-container"
          style={{ backgroundImage: `url(${truckImageLink})` }}
        >
        </div>
        <div className="card-display">
          <h3 className="truck-name">{truckName}</h3>
          <p>{city}</p>
          <p>{date}</p>
        </div>
      </div>
    </Link>
  );
};