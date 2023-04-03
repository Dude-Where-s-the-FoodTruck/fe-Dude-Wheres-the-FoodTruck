import React from "react";
import "./App.css";
import { getTrucks } from "../../apiCalls";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { MainPage } from "../MainPage/MainPage";
import { LogIn } from "../LogIn/LogIn";
import { OwnerPage } from "../OwnerPage/OwnerPage";
import TruckDetails from "../TruckDetails/TruckDetails";
import { Route, Switch, Redirect } from "react-router-dom";
export interface Truck {
  id: string;
  type: string;
  attributes: {
    name: string;
    cuisine_type: string;
    web_link: string;
    image_link: string;
    events: {
      id: number;
      food_truck_id: number;
      event_date: string;
      latitude: number;
      longitude: number;
      start_time: string;
      end_time: string;
      description: string;
      created_at: string;
      updated_at: string;
      city: string | null;
    }[];
  };
  relationships: {
    events: {
      data: {
        id: string;
        type: string;
      }[];
    };
  };
}
export type UserType = string | null;
interface AppState {
  trucks: {
    data: Truck[];
  };
  errors: string;
  filteredTrucks: Truck[];
  userType: UserType;
  loading: boolean;
  city: string;
}
class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      trucks: { data: [] },
      errors: "",
      filteredTrucks: [],
      userType: null,
      loading: true,
      city: '',
    };
  }
  async componentDidMount() {
    try {
      const storedState = localStorage.getItem('appState');
      if (storedState) {
        this.setState(JSON.parse(storedState), async () => {
          await this.fetchTrucks();
        });
      } else {
        await this.fetchTrucks();
      }
    } catch (error) {
      console.log(error);
    }
  }
  fetchTrucks = async () => {
    try {
      const data = await getTrucks();
      this.setState({
        trucks: data,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate() {
    localStorage.setItem('appState', JSON.stringify(this.state));
  }
  getFilteredTrucks = (city: string): void => {
    const { trucks } = this.state;
    const filtered = trucks.data.filter((truck) =>
      truck.attributes.events.some((event) => event.city === city)
    );
    this.setState({ filteredTrucks: filtered, city: city });
  };
  resetFilteredTrucks = (): void => {
    this.setState({ filteredTrucks: [], city: '' });
  };
  setUserType = (type: UserType): void => {
    this.setState({
      userType: type,
    });
  };
  handleLogout = (): void => {
    this.setState({ userType: null });
  };
  render() {
    const { loading, trucks, userType, filteredTrucks, city } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="main-page">
        <Switch>
          <Route exact path="/">
            <LogIn setUserType={this.setUserType} />
          </Route>
          {userType === "user" && (
            <>
            <Header />
            <Switch>
              <Route exact path="/main">
                <MainPage
                  truckData={trucks}
                  filter={this.getFilteredTrucks}
                  filteredTrucks={filteredTrucks}
                  reset={this.resetFilteredTrucks}
                  city={city}
                />
              </Route>
              <Route
                path="/foodtruck/:foodtruckID/:eventId"
                render={(props) => (
                  <TruckDetails {...props} truckData={trucks} />
                )}
              />
            </Switch>
            <Footer />
            </>
          )}
          {this.state.userType === 'owner' && (
            <Switch>
              <Route path="/owner">
                <OwnerPage userType={userType} ownerTrucks={trucks.data} fetchTrucks={this.fetchTrucks}/>
              </Route>
              {this.state.userType === "owner" && <Redirect to='/owner' />}
            </Switch>
          )}
          {this.state.userType === null && <Redirect to='/' />}
          </Switch>
        </div>
    );
  }
}
export default App






