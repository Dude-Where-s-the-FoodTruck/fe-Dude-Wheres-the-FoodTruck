import React from "react";
import './LogIn.css'

interface LogInProps{ 
    setUserType: (userType: string) => void
}

export const LogIn: React.FC<LogInProps> = ({ setUserType }) => {

    const handleUserClick = () => {
        setUserType('user')
    }

    const handleOwnerClick = () => {
        setUserType('owner')
    }

    return(
        <div>
            <h1>Pick One!</h1>
            <button onClick={handleUserClick}>I'm A hungry User</button>
            <button onClick={handleOwnerClick}>I'm A Truck Owner</button>
        </div>
    )
}