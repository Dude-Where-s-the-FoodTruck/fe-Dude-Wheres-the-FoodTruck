import React from "react";
import './LogIn.css'
import { UserType } from "../App/App";
import { useHistory } from "react-router-dom";

interface LogInProps{ 
    setUserType: (userType: UserType) => void
}

export const LogIn: React.FC<LogInProps> = ({ setUserType }) => {

    const history = useHistory()


    const handleUserClick = () => {
        setUserType('user')
        history.push("/main")
    }

    const handleOwnerClick = () => {
        setUserType('owner')
        history.push("/owner")
    }

    return(
        <div className="login-container">
            <h1>Pick One!</h1>
            <div className="button-container">
                <button className="user-button" onClick={handleUserClick}>I'm A hungry User</button>
                <button className="owner-button" onClick={handleOwnerClick}>I'm A Truck Owner</button>
            </div>
        </div>
    )
}