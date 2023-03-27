import React from 'react'
import './App.css'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { Route, Switch, Link } from "react-router-dom";

interface AppState {}

class App extends React.Component <{}, AppState> {
  state: AppState = {
    trucks: [],
    errors: "",
    filteredTrucks: []
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
