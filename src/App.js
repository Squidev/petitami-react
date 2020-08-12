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
          <header id="webpage-header">
          </header>
          <main id="webpage-content">
              {/*How the Router component works :
              You give the router an history (via the history props), here you use the browserHistory from the same library which is fine:
              <Router history={browserHistory}>
              Then you define all the existing routes for your application using the Route component with a path, and the component to load if the browser url match
              this path property.
              Router is the common low-level interface for all router components. Typically apps will use one of the high-level routers instead: BrowserRouter,
              HashRouter, MemoryRouter, NativeRouter, StaticRouter*/}
              <Router>
                      {/*A <Switch> looks through all its children <Route>
                      elements and only renders the first one whose path
                      matches the current URL. Use a <Switch> any time
                      you have multiple routes, but you want only one
                      of them to render at a time.
                      */}
                      <Switch>

                          {/* If the current URL is /pet/something, this route is rendered
                          while the rest are ignored */}
                          <Route exact={true} path="/pet/:uuid" component={PetInfo} />
                          {/* Note how these two routes are ordered. The more specific
                          path="/abm/client/:ownerId" comes before path="/abm/client/" so that
                          route will render when viewing an individual owner */}
                          <Route exact={true} path="/e5de8b99-6195/cliente/:id">
                              <ClientDetails />
                          </Route>
                          <Route exact={true} path="/e5de8b99-6195/cliente/">
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
              </Router>
          </main>
          <footer id="webpage-footer">
                 <small>
                     &copy;2020 <a href="http://www.grabital.com">Grabital</a>
                 </small>
          </footer>
      </React.Fragment>
  );
}

export default App;


