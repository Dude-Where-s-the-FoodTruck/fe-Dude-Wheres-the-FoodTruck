import React from "react";
import "./App.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { MainPage } from "../MainPage/MainPage";
import { LogIn } from "../LogIn/LogIn";
import TruckDetails from "../TruckDetails/TruckDetails";
import { Route, Switch, Link } from "react-router-dom";
import { dummyData } from "../../apiCalls";

interface TruckRelationshipAttributes {
  event_date: string;
  city: string;
  latitude: number;
  longitude: number;
  start_time: string;
  description: string;
}

interface TruckRelationships {
  type: string;
  id: number;
  attributes: TruckRelationshipAttributes;
}

interface TruckAttributes {
  name: string;
  cuisine_type: string;
  web_link: string;
  image_link: string;
}

export interface TruckData {
  id: number;
  attributes: TruckAttributes;
  relationships: TruckRelationships[];
}

interface AppState {
  trucks: TruckData[];
  errors: string;
  filteredTrucks: TruckData[];
  userType: string;
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    trucks: [],
    errors: "",
    filteredTrucks: [],
    userType: '',
  }

  componentDidMount(): void {
    this.setState({
      trucks: dummyData.map((d) => d.data),
    });
  }

  setUserType = (type: string): void => {
    this.setState({
      userType: type
    })
  }

  getFilteredTrucks = (city: string): void => {
    const { trucks } = this.state;
    const filtered = trucks.filter((truck) =>
      truck.relationships.some(
        (relationship) => relationship.attributes.city === city
      )
    );
    this.setState({ filteredTrucks: filtered });
  };

  resetFilteredTrucks = (): void => {
    this.setState({ filteredTrucks: [] });
  };

  render() {
    return (
      <div className="main-page">
        <Link style={{ textDecoration: "none" }} to="/">
          <Header />
        </Link>
        <Switch>
          <Route exact path="/">
            <MainPage
              truckData={this.state.trucks}
              filter={this.getFilteredTrucks}
              filteredTrucks={this.state.filteredTrucks}
              reset={this.resetFilteredTrucks}
            />
          </Route>
          <Route path="/foodtruck/:name" render={(props) => <TruckDetails {...props} truckData={this.state.trucks} />} />
        </Switch>
        <Link style={{ textDecoration: "none" }} to="/">
          <Footer />
        </Link>
      </div>
    );
  }
}

export default App;