import { Link } from "react-router-dom";
import headerLogo from "../../assets/foodtruck-logo.png";
import "./Header.css";

export const Header = () => {
  return (
    <Link to="/main" style={{ textDecoration: "none" }}>
      <header className="user-header">
        <img className="truck-logo" src={headerLogo} alt="foodTruck logo" />
      </header>
    </Link>
  );
};
