import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";


class AdminEventsChange extends Component {
    constructor(props) {
        super(props);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleTickets = this.handleTickets.bind(this);
        this.state = {
          title: this.props.title,
          description: this.props.description,
          event_id: this.props.eventId,
          date: this.props.date,
          tickets: this.props.tickets,
          min_tickets: this.props.min_tickets,
        };
      }

    handleTitle(e) {
        this.setState({ title: e.target.value });
    };

    handleDescription(e) {
        this.setState({ description: e.target.value });
    };

    handleDate(e) {
        this.setState({ date: e.target.value });
    };

    handleTickets(e) {
        this.setState({ tickets: e.target.value });
    };

    updateEvent() {
        axios.defaults.headers.common.authorization = localStorage.getItem(
            "access_token"
          );
        axios
            .post("/api/updateevent", {
                eventId: this.state.event_id,
                title: this.state.title,
                description: this.state.description,
                date: this.state.date,
                tickets: this.state.tickets
            })
            .then(res => {
              if (res) {
                console.log(res);
              }
            })
            .catch(err => console.log(err));
      }


  render() {
      let title = this.state.title;
      let description = this.state.description;
      let tickets = this.state.tickets;
      let date = this.state.date;
      let min_tickets = this.state.min_tickets;
    return (
      <div>
          <Form>
            <FormGroup>
                <Label for="eventmodaltext">Название</Label>
                <Input onChange={this.handleTitle} type="text" name="eventmodaltext" id="eventmodaltext" value={title} />
            </FormGroup>
            <FormGroup>
                <Label for="textmodaldesc">Описание</Label>
                <Input onChange={this.handleDescription} type="textarea" name="textmodaldesc" id="textmodaldesc" value={description} />
            </FormGroup>
            <FormGroup>
                <Label for="modaleventTickets">Кол-во билетов (не менее {min_tickets})</Label>
                <Input onChange={this.handleTickets} value={tickets} type="number" name="modaleventTickets" id="modaleventTickets" placeholder="Кол-во билетов"/>
            </FormGroup>
            <FormGroup>
                    <Label for="exampleDate">Дата проведения</Label>
                    <Input
                      onChange={this.handleDate}
                      type="date"
                      name="date"
                      id="exampleDate"
                      placeholder="Дата проведения"
                      value={date}
                    />
                  </FormGroup>
            <div className="text-center">
                <Button onClick={this.updateEvent.bind(this)} color="info">Сохранить изменения</Button>
            </div>
        </Form>
      </div>
    );
  }
}

export default AdminEventsChange;
