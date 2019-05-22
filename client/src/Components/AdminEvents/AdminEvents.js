import React, { Component } from 'react';
import { Toast, ToastBody, ToastHeader, Button, Row, Col , Form, FormGroup, Label, Input} from 'reactstrap';
import axios from "axios";
import $ from 'jquery';
import "./AdminEvents.css";


class AdminEvents extends Component {

  constructor(props) {
    super(props);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleTickets = this.handleTickets.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.state = {
      data: [],
      title: null,
      description: null,
      tickets: null,
      date: null,
      nice_add:false
    };
  }

handleTitle(e) {
    this.setState({ title: e.target.value });
};

handleDescription(e) {
    this.setState({ description: e.target.value });
};

handleTickets(e) {
  this.setState({ tickets: e.target.value });
};

handleDate(e) {
  this.setState({ date: e.target.value });
};

sendEvent() {
        axios.defaults.headers.common.authorization = localStorage.getItem(
          "access_token"
        );
        axios
          .post("/api/addevent", {
              title: this.state.title,
              description: this.state.description,
              tickets: this.state.tickets,
              date: this.state.date,
          })
          .then(res => {
            if(res.data.status === "success"){
                this.setState({ nice_add: true });
                axios.defaults.headers.common.authorization = localStorage.getItem(
                    "access_token"
                  );
                  axios
                    .get("/api/showallevents")
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

deleteEvent(e) {
    let element = $(e.currentTarget);
    let id_event = $(element).data('id');
    axios.defaults.headers.common.authorization = localStorage.getItem(
        "access_token"
      );
      axios
        .post("/api/delevent", {
            eventId: id_event
        })
        .then(res => {
          if (res) {
              axios.defaults.headers.common.authorization = localStorage.getItem(
                "access_token"
              );
              axios
                .get("/api/showallevents")
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
      .get("/api/showallevents")
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
                let event = JSON.parse(item);
                let eventDate = event.event_date;
                let eventTickets;
                if (event.total_count){
                  eventTickets = event.total_count;
                } else {
                  eventTickets = 0;
                }
                eventDate = eventDate.substring(0, eventDate.length-14);
                    return (
                        <div key={key} className="admin-news-wrapper mt-4">
                            <Toast>
                                <ToastHeader>
                                    {event.event_name}
                                </ToastHeader>
                                <ToastBody>
                                    {event.description}
                                    <p>Tickets: {eventTickets} / {event.tickets}</p>
                                    <p><i>{eventDate}</i></p>
                                </ToastBody>
                            </Toast>
                            <div className="text-center">
                                <Button data-id={event.event_id} color="info">Изменть</Button>{' '}
                                <Button data-id={event.event_id} onClick={this.deleteEvent.bind(this)} color="warning">Удалить</Button>
                            </div>
                        </div>
                    );
            })}
        </Col>
        <Col sm="6">
            <h3 className="mt-4 mb-4">Добавить событие</h3>
                <Form>
                  <FormGroup>
                        <Input onChange={this.handleTitle} type="text" name="eventTitle" id="eventTitle" placeholder="Заголовок" />
                  </FormGroup>
                  <FormGroup>
                        <Input onChange={this.handleDescription} type="textarea" name="eventDescription" id="eventDescription" placeholder="Описание события"/>
                  </FormGroup>
                  <FormGroup>
                        <Input onChange={this.handleTickets} type="number" name="eventTickets" id="eventTickets" placeholder="Кол-во билетов"/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleDate">Дата проведения</Label>
                    <Input
                      onChange={this.handleDate}
                      type="date"
                      name="date"
                      id="exampleDate"
                      placeholder="Дата проведения"
                    />
                  </FormGroup>
                  <FormGroup >
                    <Button onClick={this.sendEvent.bind(this)} color="info">Добавить</Button>
                  </FormGroup>
                </Form>
        </Col>
        </Row>
    </div>
    );
  }
}

export default AdminEvents;