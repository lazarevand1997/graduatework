import React, { Component } from 'react';
import "./News.css";
import axios from "axios";

class News extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "access_token"
    );
    axios
      .get("/api/showlastnews")
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
      <div className="container-fluid news" id="newsblock">
        <div className="text-center">
          <h1 className="news-title wow fadeInUpBig">Последние новости</h1>
        </div>
        <div className="container pt-5 wow fadeInUpBig" data-wow-delay="0.5s">

          {this.state.data.map((item, key) => {
                let newsItem = JSON.parse(item);
                let dateNews = newsItem.news_date;
                dateNews = dateNews.substring(0, dateNews.length-14);
                    return (
                        <div key={key} className="card mt-3">
                          <div className="card-header text-left">
                            <i>{dateNews}</i>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{newsItem.news_name}</h5>
                            <p className="card-text">{newsItem.description}</p>
                          </div>
                        </div>
                    );
            })}

        </div>
      </div>
    );
  }
}

export default News;
