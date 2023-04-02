import './MainPage.css';
import { Truck } from "../App/App";
import { Trucks } from '../Trucks/Trucks';
import FilterForm from '../FilterForm/FilterForm';

interface MainPageProps {
  truckData: {
    data: Truck[];
  };
  filter: (city: string) => void;
  filteredTrucks: Truck[];
  reset: () => void;
  city: string;
}

export const MainPage: React.FC<MainPageProps> = ({ truckData, filter, filteredTrucks, reset, city }) => {
  // console.log(truckData.data.map((truck) => truck.attributes.name))
  return (
    <div className='truck-view'>
      <FilterForm truckData={truckData} filteredTrucks={filteredTrucks} filter={filter} reset={reset} />
      <Trucks truckData={filteredTrucks.length ? filteredTrucks : truckData.data} city={city} />
    </div>
  );
};

export default MainPage;
