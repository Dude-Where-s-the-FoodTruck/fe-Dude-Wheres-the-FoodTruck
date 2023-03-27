import './MainPage.css'
import FilterForm from '../FilterForm/FilterForm'
import { Trucks, TrucksProps } from '../Trucks/Trucks';

interface MainPageProps {
    truckData: {
        data: {
            id: number;
            attributes: {
                name: string;
                cuisine_type: string;
                web_link: string;
                image_link: string;
            };
        }[];
    }[];
}

export const MainPage: React.FC<MainPageProps> = ({ truckData } ) => {
    const trucksProps: TrucksProps = { truckData };
    return (
        <div className='truck-view'>
            <FilterForm />
            <Trucks {...trucksProps} />
        </div>
    )
}