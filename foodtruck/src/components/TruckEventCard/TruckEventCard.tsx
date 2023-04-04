import "./TruckEventCard.css";
import { Link } from "react-router-dom";

export interface TruckEventCardProps {
  id: number;
  name: string;
  city: string | null | undefined;
  date: string;
}

export const TruckEventCard: React.FC<TruckEventCardProps> = ({
  id,
  name,
  city,
  date,
}) => {
  const cityName = city || "Not Specified";
  return (
    <Link
      className="event-card-container"
      to={`/owner/events/${id}`}
      style={{ textDecoration: "none" }}
    >
      <p>{name}</p>
      <p>{cityName}</p>
      <p>{date}</p>
    </Link>
  );
};
