import React from 'react';
import './App.css';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import PetInfo from "./components/PetInfo";
import ClientABM from "./components/ClientABM";
import ClientDetails from "./components/ClientDetails";
import Home from "./components/Home";

function App() {
  return (
      <React.Fragment>
          <header className="webpage-header">Header</header>
          <Router>
              <div>

                  {/*A <Switch> looks through all its children <Route>
                  elements and renders the first one whose path
                  matches the current URL. Use a <Switch> any time
                  you have multiple routes, but you want only one
                  of them to render at a time
                  */}
                  <Switch>

                      {/* If the current URL is /pet/something, this route is rendered
                      while the rest are ignored */}
                      <Route exact={true} path="/pet/:uuid" component={PetInfo} />
                      {/* Note how these two routes are ordered. The more specific
                      path="/abm/client/:ownerId" comes before path="/abm/client/" so that
                      route will render when viewing an individual owner */}
                      <Route exact={true} path="/abm/client/:id">
                          <ClientDetails />
                      </Route>
                      <Route exact={true} path="/abm/client/">
                          <ClientABM />
                      </Route>

                      {/* If none of the previous routes render anything,
                      this route acts as a fallback.

                      Important: A route with path="/" will *always* match
                      the URL because all URLs begin with a /. So that's
                      why we put this one last of all */}
                      <Route path="/">
                          <Home />
                      </Route>
                  </Switch>
              </div>
          </Router>
      </React.Fragment>
  );
}

export default App;


