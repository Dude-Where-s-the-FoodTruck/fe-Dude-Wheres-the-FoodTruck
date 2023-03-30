import React from "react";
import './OwnerPage.css'

interface OwnerPageState{}

export class OwnerPage extends React.Component <{}, OwnerPageState>{
    constructor(props: OwnerPageState){
        super(props)
        this.state = {}
    }

    
    render(){
        return(<div>Hello world!!</div>)
    }
}


