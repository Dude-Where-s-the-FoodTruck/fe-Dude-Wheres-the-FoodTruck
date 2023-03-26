import React from "react";
import headerLogo from '../../assets/foodtruck-logo.png'
import './Header.css'

export const Header = () => {
    return(
        <header>
            <h1>Dude, Where's My FoodTruck</h1>
            <img src={headerLogo} alt='foodTruck logo'></img>
        </header>
    )
}