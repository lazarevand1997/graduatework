import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import "./Events.css";
import axios from "axios";

class Events extends Component {
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
      <div className="container events-wrapper">
        <div classname="events-title">
            <h1>Расписание событий и мероприятий</h1>
        </div>
        <div className="events-case mt-5">
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
                          <div key={key} class="card mt-3">
                            <div class="card-header text-left">
                              <i>{eventDate}</i>
                            </div>
                            <div class="card-body">
                              <h5 class="card-title"> {event.event_name}</h5>
                              <p class="card-text">
                                {event.description}
                                <p>Билеты: {eventTickets} / {event.tickets}</p>
                              </p>
                              <div className="text-center">
                                <Button 
                                  data-id={event.event_id} 
                                  data-title={event.event_name}
                                  data-description={event.description}
                                  data-date={eventDate}
                                  data-tickets={event.tickets}
                                  data-min_tickets={eventTickets}
                                  onClick={this.toggle} 
                                  color="info"
                                >Забронировать билеты</Button>{' '}
                              </div>
                            </div>
                          </div>
                    );
            })}
        </div>
      </div>
    );
  }
}

export default Events;