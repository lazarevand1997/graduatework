import React, { Component } from "react";
import axios from "axios";
import "./Circles.css";

class Circles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "access_token"
    );
    axios
      .get("/api/showallcircles")
      .then(res => {
        if (res) {
          this.setState({
            data: res.data
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="container circles-wrapper">
        <div class="card-columns">
          {this.state.data.map((item, key) => {
            let circleItem = JSON.parse(item);
            return (
              <div class="card" key={key}>
                <div class="card-body">
                  <h5 class="card-title">{circleItem.title}</h5>
                  <p class="card-text">{circleItem.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Circles;
