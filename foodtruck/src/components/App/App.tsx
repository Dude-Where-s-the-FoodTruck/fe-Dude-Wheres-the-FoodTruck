import React from 'react'
import './App.css'
import { Header } from '../Header/Header'

interface AppProps {}

class App extends React.Component <AppProps> {
  constructor(props:AppProps){
    super(props)

  }

  render(){
    return(
      <div>
        <Header />
      </div>
    )
  }
}


export default App
