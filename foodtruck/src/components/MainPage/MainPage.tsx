import './MainPage.css'
import FilterForm from '../FilterForm/FilterForm'
import { Trucks, TrucksProps } from '../Trucks/Trucks';
import { TruckData } from '../App/App';

interface MainPageProps {
  truckData: TruckData[];
}

export const MainPage: React.FC<MainPageProps> = ({ truckData }) => {
  const trucksProps: TrucksProps = { truckData };
  return (
    <div className='truck-view'>
      <FilterForm />
      <Trucks {...trucksProps} />
    </div>
  );
};