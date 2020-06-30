import React, {Component} from "react";
import {Link} from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <React.Fragment>
                <h1>Home page</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/pet/uuid">Pet information</Link>
                        </li>
                        <li>
                            <Link to="/abm/client/">Client ABM</Link>
                        </li>
                    </ul>
                </nav>
            </React.Fragment>
        );
    }
}

export default Home;