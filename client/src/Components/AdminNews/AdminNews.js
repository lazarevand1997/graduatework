import React, { Component } from 'react';
import { Toast, ToastBody, ToastHeader, Button, Row, Col , Form, FormGroup, Input} from 'reactstrap';
import axios from "axios";
import $ from 'jquery';
import "./AdminNews.css";


class AdminNews extends Component {
    constructor(props) {
        super(props);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.state = {
          data: [],
          title: null,
          description: null,
          nice_add:false
        };
    }

    handleTitle(e) {
        this.setState({ title: e.target.value });
    };

    handleDescription(e) {
        this.setState({ description: e.target.value });
    };

    sendNews() {
            axios.defaults.headers.common.authorization = localStorage.getItem(
              "access_token"
            );
            axios
              .post("/api/addnews", {
                  title: this.state.title,
                  description: this.state.description,
              })
              .then(res => {
                if(res.data.status === "success"){
                    this.setState({ nice_add: true });
                    axios.defaults.headers.common.authorization = localStorage.getItem(
                        "access_token"
                      );
                      axios
                        .get("/api/showallnews")
                        .then(res => {
                          if (res) {
                              this.setState({
                                  data: res.data
                              });
                          }
                        })
                        .catch(err => console.log(err));
                } else {
                    this.setState({ nice_add: false });
                }
              })
              .catch(err => console.log(err));
    }

    deleteNews(e) {
        let element = $(e.currentTarget);
        let id_news = $(element).data('id');
        axios.defaults.headers.common.authorization = localStorage.getItem(
            "access_token"
          );
          axios
            .post("/api/delnews", {
                newsId: id_news
            })
            .then(res => {
              if (res) {
                axios.defaults.headers.common.authorization = localStorage.getItem(
                    "access_token"
                  );
                  axios
                    .get("/api/showallnews")
                    .then(res => {
                      if (res) {
                          this.setState({
                              data: res.data
                          });
                      }
                    })
                    .catch(err => console.log(err));
              }
            })
            .catch(err => console.log(err));
      }

    componentDidMount() {
        axios.defaults.headers.common.authorization = localStorage.getItem(
          "access_token"
        );
        axios
          .get("/api/showallnews")
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
    <div className="container mt-3">
        <Row>
        <Col sm="6">
            {this.state.data.map((item, key) => {
                let newsItem = JSON.parse(item);
                let dateNews = newsItem.news_date;
                dateNews = dateNews.substring(0, dateNews.length-14);
                    return (
                        <div key={key} className="admin-news-wrapper mt-4">
                            <Toast>
                                <ToastHeader>
                                    {newsItem.news_name}
                                </ToastHeader>
                                <ToastBody>
                                    {newsItem.description}
                                    <p><i>{dateNews}</i></p>
                                </ToastBody>
                            </Toast>
                            <div className="text-center">
                                <Button data-id={newsItem.news_id} color="info">Изменть</Button>{' '}
                                <Button data-id={newsItem.news_id} onClick={this.deleteNews.bind(this)} color="warning">Удалить</Button>
                            </div>
                        </div>
                    );
            })}
        </Col>
        <Col sm="6">
            <h3 className="mt-4 mb-4">Добавить новость</h3>
                <Form>
                  <FormGroup>
                        <Input onChange={this.handleTitle} type="text" name="newsTitle" id="newsTitle" placeholder="Заголовок" />
                  </FormGroup>
                  <FormGroup>
                        <Input onChange={this.handleDescription} type="textarea" name="newsDescription" id="newsDescription" placeholder="Текст новости"/>
                  </FormGroup>
                  <FormGroup >
                    <Button onClick={this.sendNews.bind(this)} color="info">Добавить новость</Button>
                  </FormGroup>
                </Form>
        </Col>
        </Row>
    </div>
    );
  }
}

export default AdminNews;