import React from "react";
import "./App.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { MainPage } from "../MainPage/MainPage";
import { OwnerPage } from "../OwnerPage/OwnerPage";
import { LogIn } from "../LogIn/LogIn";
import TruckDetails from "../TruckDetails/TruckDetails";
import { Route, Switch, Redirect } from "react-router-dom";
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

export type UserType = 'user' | 'owner' | null

interface AppState {
  trucks: TruckData[];
  errors: string;
  filteredTrucks: TruckData[];
  userType: UserType;
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    trucks: [],
    errors: "",
    filteredTrucks: [],
    userType: null,
  }

  componentDidMount(): void {
    this.setState({
      trucks: dummyData.map((d) => d.data),
    });
  }

  setUserType = (type: UserType): void => {
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
        <Switch>
          <Route exact path="/">
            <LogIn setUserType={this.setUserType}/>
          </Route>
          {this.state.userType === 'user' && (
            <>
            <Header />
            <Switch>
              <Route exact path="/main">
                <MainPage
                  truckData={this.state.trucks}
                  filter={this.getFilteredTrucks}
                  filteredTrucks={this.state.filteredTrucks}
                  reset={this.resetFilteredTrucks}
                />
              </Route>
              <Route 
                path="/foodtruck/:name"
                render={(props) => (
                  <TruckDetails {...props} truckData={this.state.trucks}/>
                )}
              />
              {this.state.userType === 'user' && <Redirect to='/main' />}
            </Switch>
            <Footer />
            </>
          )}
        {this.state.userType === 'owner' && (
          <Switch>
            <Route path="/owner">
              <OwnerPage userType={this.state.userType}/>
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

export default App;