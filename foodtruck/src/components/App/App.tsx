import React from 'react'
import './App.css'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { Route, Switch, Link } from "react-router-dom";
import { dummyData } from '../../apiCalls';


interface Trucks {
  data: {
    id: number;
    attributes: {
      name: string;
      cuisine_type: string;
      web_link: string;
      image_link: string;
    };
  }[];
}

interface AppState {
  trucks: Trucks[];
  errors: string;
  filteredTrucks: []
}

class App extends React.Component <{}, AppState> {
  state: AppState = {
    trucks: [],
    errors: "",
    filteredTrucks: []
  }

  componentDidMount(): void {
    this.setState({
      trucks: dummyData
    })
    
  }

  render(){
    return(
      <div>
        <Link style={{ textDecoration: "none" }} to="/">
          <Header />
        </Link>
        <Switch>
          <Route exact path="/">
            <div>
            </div>
          </Route>
        </Switch>
        <Link style={{ textDecoration: "none" }} to="/">
          <Footer />
        </Link>
      </div>
    )
  }
}


export default App
