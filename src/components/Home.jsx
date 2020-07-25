import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./Home.css"
import petitAmiLogo from "./logos/petitami-logo.png"

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="home-backdrop" className="">
                <img src={petitAmiLogo} alt=""/>
            </div>
        );
    }
}

export default Home;