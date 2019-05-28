import React, { Component } from 'react';
import Header from "../Components/Header/Header";
import Events from "../Components/Events/Events";

class EventsPage extends Component {

  render() {
    return (
      <div>
        <Header/>
        <Events />
      </div>
    );
  }
}

export default EventsPage;
