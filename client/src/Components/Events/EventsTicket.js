import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import axios from "axios";


class AdminNewsChange extends Component {
    constructor(props) {
        super(props);
        this.handlePlaces = this.handlePlaces.bind(this);
        this.state = {
          title: this.props.title,
          description: this.props.description,
          event_id: this.props.eventId,
          tickets: this.props.tickets,
          uses_tickets:this.props.min_tickets,
          date: this.props.date,
          places: null,
          hashkey: null,
          sended: false,
        };
      }

    handlePlaces(e) {
        this.setState({ places: e.target.value });
    };

    postTicket() {
        axios.defaults.headers.common.authorization = localStorage.getItem(
            "access_token"
          );
        axios
            .post("/api/getticket", {
                event_id: this.state.event_id,
                places: this.state.places,
            })
            .then(res => {
              if (res.data.status === "success") {
                  console.log(res.data);
                this.setState({
                    sended: true,
                    hashkey: res.data.hashkey
                });
              }
            })
            .catch(err => console.log(err));
      }


  render() {
      let title = this.state.title;
      let date = this.state.date;
      let tickets = this.state.tickets;
      let uses_tickets = this.state.uses_tickets;
      let max_tickets = tickets - uses_tickets;
      let sended = this.state.sended;
      let places = this.state.places;
      let hashkey = this.state.hashkey;
      if(sended) {
        return (
            <div className="container">
                <p>Кол-во билетов : {places}</p>
                <p>Ваш ключ подтверждения брони : {hashkey}</p>
            </div>
            );
      } else {
        return (
        <div>
            <Form>
                <div className="text-center mb-2">
                    <b>{title}</b>
                    <p><i>{date}</i></p>
                    Билетов осталось: {max_tickets} / {tickets}
                </div>
                <FormGroup>
                    <Input onChange={this.handlePlaces} type="number" name="modaleventplaces" id="modaleventplaces" placeholder="Кол-во билетов"/>
                </FormGroup>
                <div className="text-center">
                    <Button onClick={this.postTicket.bind(this)} color="info">Забронировать</Button>
                </div>
            </Form>
        </div>
        );
      }
  }
}

export default AdminNewsChange;
