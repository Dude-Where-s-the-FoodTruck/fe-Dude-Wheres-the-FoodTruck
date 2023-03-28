import "./TruckCard.css";
import { Link } from "react-router-dom";

export interface TruckCardProps {
  id: number;
  name: string;
  city: string;
  date: string;
  cuisine: string;
  website: string;
  image: string;
}

export const TruckCard: React.FC<TruckCardProps> = ({
  id,
  name,
  city,
  date,
  image,
}) => {
  return (
    <Link
      to={`/foodtruck/${name}`}
      style={{ textDecoration: "none", width: "300px", height: "400px" }}
    >
      <div
        className="card-container"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="card-display">
          <h3 className="truck-name">{name}</h3>
          <p>{city}</p>
          <p>{date}</p>
        </div>
      </div>
    </Link>
  );
};