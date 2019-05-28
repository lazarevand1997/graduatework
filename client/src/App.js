import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import EventsPage from "./Pages/EventsPage";
import AdminPage from "./Pages/AdminPage";
import CirclesPage from "./Pages/CirclesPage";
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
          <BrowserRouter>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/events" component={EventsPage} />
                <Route path="/circles" component={CirclesPage} />
                <Route path="/admin" component={AdminPage} />
              </Switch>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
