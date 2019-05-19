import React, { Component } from 'react';
import { Toast, ToastBody, ToastHeader, Button, Row, Col , Form, FormGroup, Label, Input} from 'reactstrap';
import "./AdminEvents.css";


class AdminEvents extends Component {

  render() {
    return (
    <div className="container mt-3">
        <Row>
        <Col sm="6">
                <div className="admin-events-wrapper mt-4">
                    <Toast>
                        <ToastHeader>
                            Event title
                        </ToastHeader>
                        <ToastBody>
                            <p>text text text text text text text text text text text text text text text text text text</p>
                            <p>date: 12.04.2019</p>
                            <p>Tickets: 120/134</p>
                        </ToastBody>
                    </Toast>
                    <div className="text-center">
                        <Button color="info">Изменть</Button>{' '}
                        <Button color="warning">Удалить</Button>{' '}
                    </div>
                </div>

                <div className="admin-events-wrapper mt-4">
                    <Toast>
                        <ToastHeader>
                            Event title
                        </ToastHeader>
                        <ToastBody>
                            <p>text text text text text text text text text text text text text text text text text text</p>
                            <p>date: 12.04.2019</p>
                            <p>Tickets: 120/134</p>
                        </ToastBody>
                    </Toast>
                    <div className="text-center">
                        <Button color="info">Изменть</Button>{' '}
                        <Button color="warning">Удалить</Button>{' '}
                    </div>
                </div>
        </Col>
        <Col sm="6">
            <h3 className="mt-4 mb-4">Добавить событие</h3>
                <Form>
                  <FormGroup>
                        <Input type="text" name="eventTitle" id="eventTitle" placeholder="Заголовок" />
                  </FormGroup>
                  <FormGroup>
                        <Input type="textarea" name="eventDescription" id="eventDescription" placeholder="Текст новости"/>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" id="checkbox2" />{' '}
                      Открыт для бронирования билетов
                    </Label>
                  </FormGroup>
                  <FormGroup>
                        <Input type="number" name="eventTickets" id="eventTickets" placeholder="Кол-во билетов"/>
                  </FormGroup>
                  <FormGroup >
                    <Button color="info">Добавить</Button>
                  </FormGroup>
                </Form>
        </Col>
        </Row>
    </div>
    );
  }
}

export default AdminEvents;