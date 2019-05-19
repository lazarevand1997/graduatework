import React, { Component } from 'react';
import Header from "../Components/Header/Header";
import MainImage from "../Components/MainImage/MainImage";
import News from "../Components/News/News";
import Feedback from "../Components/Feedback/Feedback";

class HomePage extends Component {

  render() {
    return (
      <div>
        <Header/>
        <MainImage/>
        <News/>
        <Feedback />
      </div>
    );
  }
}

export default HomePage;