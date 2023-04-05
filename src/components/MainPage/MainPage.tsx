import "./MainPage.css";
import { Truck } from "../App/App";
import { Trucks } from "../Trucks/Trucks";
import FilterForm from "../FilterForm/FilterForm";
import { Link } from "react-router-dom";

interface MainPageProps {
  truckData: {
    data: Truck[];
  };
  filter: (city: string) => void;
  filteredTrucks: Truck[];
  reset: () => void;
  city: string;
}

export const MainPage: React.FC<MainPageProps> = ({
  truckData,
  filter,
  filteredTrucks,
  reset,
  city,
}) => {
  return (
    <>
      <div className="change-user-wrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
          <button className="change-user">Change User</button>
        </Link>
      </div>
      <div className="truck-view">
        <FilterForm
          truckData={truckData}
          filteredTrucks={filteredTrucks}
          filter={filter}
          reset={reset}
        />
        <Trucks
          truckData={filteredTrucks.length ? filteredTrucks : truckData.data}
          city={city}
        />
      </div>
    </>
  );
};

export default MainPage;
