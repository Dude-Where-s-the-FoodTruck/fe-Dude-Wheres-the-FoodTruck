import React from 'react'
import './App.css'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'

interface AppProps {}

class App extends React.Component <AppProps> {
  constructor(props:AppProps){
    super(props)

  }

  render(){
    return(
      <div>
        <Header />
        <Footer />
      </div>
    )
  }
}


export default App
