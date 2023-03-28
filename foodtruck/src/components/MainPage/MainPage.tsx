import React from 'react';
import './MainPage.css';
import FilterForm from '../FilterForm/FilterForm';
import { Trucks } from '../Trucks/Trucks';
import { TruckData } from '../App/App';

interface MainPageProps {
  truckData: TruckData[];
  filter: (city: string) => void;
  filteredTrucks: TruckData[];
  reset: () => void;
}

export const MainPage: React.FC<MainPageProps> = ({ truckData, filter, filteredTrucks, reset }) => {
  return (
    <div className='truck-view'>
      <FilterForm truckData={truckData} filter={filter} filteredTrucks={filteredTrucks} reset={reset} />
      <Trucks truckData={filteredTrucks.length ? filteredTrucks : truckData} />
    </div>
  );
};