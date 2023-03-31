import React from "react";
import './OwnerPage.css'
import headerLogo from '../../assets/foodtruck-logo.png'
import { UserType } from "../App/App";
import { TruckEvents } from "../TruckEvents/TruckEvents";
import { EditTruckForm } from "../EditTruckForm/EditTruckForm";

interface OwnerPageState{
    userType: UserType
}

export const OwnerPage: React.FC <OwnerPageState> = ({userType}) => {

    return(
        <>
            {userType === "owner" && (
                <div>
                    <header className="header">
                        <img className="truck-logo" src={headerLogo} alt="food-truck-logo"/>
                    </header>
                    <TruckEvents />
                    <EditTruckForm />
                </div>
            )}
        </>
    )


}


