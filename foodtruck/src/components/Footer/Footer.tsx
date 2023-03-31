import './Footer.css'
import { Link } from "react-router-dom";

export const Footer = () => {
    return(
        <Link to='/main' style={{textDecoration: "none"}}>
            <footer className="footer">
                <h3 className="footer-name">© Dude, Where's The FoodTruck</h3>
                <p className="footer-city">Denver, CO</p>
            </footer>
        </Link>
    )
}