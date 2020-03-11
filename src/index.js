import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Route, Link, BrowserRouter as Router} from "react-router-dom";
import DogForm from "./components/DogForm";
import DogInfo from "./components/DogInfo";

const routing = (
    <Router>
        <div>

            <Route exact={true} path="/dog/" render={()=>(
                <ul>
                <li>
                    <Link to="/dog/id">Dog information</Link>
                </li>
                <li>
                    <Link to="/dog-form">Dog form</Link>
                </li>
            </ul>
            )} />
            <Route exact={true} path="/dog/:id" component={DogInfo} />
            <Route path="/dog-form" component={DogForm} />
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
