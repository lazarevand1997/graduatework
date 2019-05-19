import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import "./Events.css";

class Events extends Component {

  render() {
    return (
      <div className="container-fluid events-wrapper">
        <div classname="events-title">
            <h1>Расписание событий и мероприятий</h1>
        </div>
        <div className="events-case mt-5">
            <div className="events-card mt-3">
                <Card body>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button outline color="primary" size="sm">Больше информации (модалка)</Button>
                </Card>
            </div>
            <div className="events-card mt-3">
                <Card body>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button outline color="primary" size="sm">Чпоньк</Button>
                </Card>
            </div>
            <div className="events-card mt-3">
                <Card body>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button outline color="primary" size="sm">Чпоньк</Button>
                </Card>
            </div>
        </div>
      </div>
    );
  }
}

export default Events;