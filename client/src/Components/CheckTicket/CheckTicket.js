import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleHash = this.handleHash.bind(this);
    this.state = {
      title: null,
      tickets: null,
      date: null,
      hashkey: null,
      sended: false
    };
  }

  handleHash(e) {
    this.setState({ hashkey: e.target.value });
  }

  checkTicket() {
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "access_token"
    );
    axios
      .post("/api/checkticket", {
        keyhash: this.state.hashkey
      })
      .then(res => {
        if (res) {
          let data = JSON.parse(res.data[0]);
          this.setState({
            sended: true,
            title: data.event_name,
            date: data.event_date,
            tickets: data.ticket_number
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    let sended = this.state.sended;

    let date = this.state.date;
    let title = this.state.title;
    let tickets = this.state.tickets;

    if (sended && (date !== null)) {
      date  = date.substring(0, date.length-14);
      return (
        <div className="container">
          <p>Событие:  {title}</p>
          <p>Дата: {date} </p>
          <p>Кол-во билетов:  {tickets}</p>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <Form>
              <FormGroup>
                <Label for="ticketkey">Код билета</Label>
                <Input
                  onChange={this.handleHash}
                  type="text"
                  name="ticketkey"
                  id="ticketkey"
                />
              </FormGroup>
              <div className="text-center">
                <Button onClick={this.checkTicket.bind(this)} color="info">Проверить</Button>
              </div>
            </Form>
          </div>
        </div>
      );
    }
  }
}

export default HomePage;
