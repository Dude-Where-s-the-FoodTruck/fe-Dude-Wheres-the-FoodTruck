import React from "react";
import headerLogo from '../../assets/foodtruck-logo.png'
import './Header.css'

export const Header = () => {
    return(
        <header className="header">
            <img className="truck-logo" src={headerLogo} alt='foodTruck logo'/>
        </header>
    )
}