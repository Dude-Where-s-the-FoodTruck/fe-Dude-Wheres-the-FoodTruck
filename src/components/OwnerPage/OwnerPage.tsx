import React from "react";
import "./OwnerPage.css";
import headerLogo from "../../assets/foodtruck-logo.png";
import { Truck } from "../App/App";
import { TruckEvents } from "../TruckEvents/TruckEvents";
import { EditTruckForm } from "../EditTruckForm/EditTruckForm";
import { UpdateEventForm } from "../UpdateEventForm/UpdateEventForm";
import { CreateEventForm } from "../CreateEventForm/CreateEventForm";
import { Link, Switch, Route } from "react-router-dom";

interface OwnerPageProps {
  userType: string | null;
  ownerTrucks: Truck[];
  fetchTrucks: () => Promise<void>;
}

export const OwnerPage: React.FC<OwnerPageProps> = ({
  userType,
  ownerTrucks = [],
  fetchTrucks,
}) => {
  const filteredOwnerTrucks = ownerTrucks.filter((truck) => truck.id === "2");

  return (
    <>
      {userType === "owner" && (
        <div className="owner-page-view">
          <header className="header">
            <div className="buttons">
              <Link
                to="/owner/create-event"
                className="add-event-button"
                style={{ textDecoration: "none" }}
              >
                Add Event
              </Link>
              <Link to="/owner">
                <button className="back-to-owner">Back to Home</button>
              </Link>
              <Link to="/" style={{ textDecoration: "none" }}>
                <button className="change-user">Change User</button>
              </Link>
            </div>
            <Link to="/owner">
              <img
                className="truck-logo"
                src={headerLogo}
                alt="food-truck-logo"
              />
            </Link>
          </header>

          <div className="events-edit-container">
            <Switch>
              <Route exact path="/owner">
                <TruckEvents ownerTrucks={filteredOwnerTrucks} />
                <EditTruckForm
                  fetchTrucks={fetchTrucks}
                  filteredOwnerTrucks={filteredOwnerTrucks}
                />
              </Route>
              <Route path="/owner/events/:eventId">
                <UpdateEventForm
                  ownerTrucks={filteredOwnerTrucks}
                  fetchTrucks={fetchTrucks}
                />
              </Route>
              <Route path="/owner/create-event">
                <CreateEventForm
                  ownerTrucks={filteredOwnerTrucks}
                  fetchTrucks={fetchTrucks}
                />
              </Route>
            </Switch>
          </div>
          <footer className="owner-footer">
            <h3 className="owner-footer-name">© Dude, Where's The FoodTruck</h3>
            <p className="owner-footer-city">Denver, CO</p>
          </footer>
        </div>
      )}
    </>
  );
};
