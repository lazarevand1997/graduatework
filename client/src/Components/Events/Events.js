import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import "./Events.css";
import axios from "axios";
import $ from "jquery";
import EventsTicket from "./EventsTicket";

class Events extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      data: [],
      modal: false,
      modal_id: null,
      modal_title: null,
      modal_desc: null,
      modal_date: null,
      modal_tickets: null,
      modal_min_tickets: null,
    };
  }

  toggle(e) {
    let element = $(e.currentTarget);
    let modal_id = $(element).data('id');
    let modal_title = $(element).data('title');
    let modal_desc = $(element).data('description');
    let modal_date = $(element).data('date');
    let modal_tickets = $(element).data('tickets');
    let modal_min_tickets = $(element).data('min_tickets');
    this.setState(prevState => ({
      modal_id: modal_id,
      modal_title: modal_title,
      modal_desc: modal_desc,
      modal_date: modal_date,
      modal_tickets: modal_tickets,
      modal_min_tickets: modal_min_tickets,
      modal: !prevState.modal
    }));

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
        <div className="events-title wow mt-3 fadeIn">
            <h1>Расписание событий и мероприятий</h1>
        </div>
        <div className="events-case mt-5 wow fadeInUpBig">
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
                          <div key={key} className="card mt-3">
                            <div className="card-header text-left">
                              <i>{eventDate}</i>
                            </div>
                            <div className="card-body">
                              <h5 className="card-title"> {event.event_name}</h5>
                              <p className="card-text">
                                {event.description}
                                <br/>Куплено билетов: {eventTickets} / {event.tickets}
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
        <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true} className={this.props.className} size="lg">
             <ModalHeader toggle={this.toggle}>Забронировать билеты</ModalHeader>
             <ModalBody>
                <EventsTicket 
                  eventId={this.state.modal_id} 
                  title={this.state.modal_title} 
                  description={this.state.modal_desc} 
                  date={this.state.modal_date} 
                  tickets={this.state.modal_tickets} 
                  min_tickets={this.state.modal_min_tickets} 
                />
             </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Events;
