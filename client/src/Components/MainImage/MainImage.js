import React, { Component } from 'react';
import "./MainImage.css";

class MainImage extends Component {

  render() {
    return (
      <div className="container-fluid mainimage-wrapper">
        <div className="filter-main">
        <div className="maintext-wrapper">
          <div className="maintext wow fadeInUpBig">
            <p>Дом Культуры</p>
            <p className="maintextabout">Краткое описание дома культуры МИЭТ</p>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default MainImage;
