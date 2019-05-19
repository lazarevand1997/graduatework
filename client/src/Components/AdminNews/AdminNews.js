import React, { Component } from 'react';
import { Toast, ToastBody, ToastHeader, Button, Row, Col , Form, FormGroup, Input} from 'reactstrap';
import "./AdminNews.css";


class AdminNews extends Component {

  render() {
    return (
    <div className="container mt-3">
        <Row>
        <Col sm="6">
                <div className="admin-news-wrapper mt-4">
                    <Toast>
                        <ToastHeader>
                            News title
                        </ToastHeader>
                        <ToastBody>
                            text text text text text text text text text text text text text text text text text text
                        </ToastBody>
                    </Toast>
                    <div className="text-center">
                        <Button color="info">Изменть</Button>{' '}
                        <Button color="warning">Удалить</Button>{' '}
                    </div>
                </div>
                <div className="admin-news-wrapper mt-4">
                    <Toast>
                        <ToastHeader>
                            News title
                        </ToastHeader>
                        <ToastBody>
                            text text text text text text text text text text text text text text text text text text
                        </ToastBody>
                    </Toast>
                    <div className="text-center">
                        <Button color="info">Изменть</Button>{' '}
                        <Button color="warning">Удалить</Button>{' '}
                    </div>
                </div>
        </Col>
        <Col sm="6">
            <h3 className="mt-4 mb-4">Добавить новость</h3>
                <Form>
                  <FormGroup>
                        <Input type="text" name="newsTitle" id="newsTitle" placeholder="Заголовок" />
                  </FormGroup>
                  <FormGroup>
                        <Input type="textarea" name="newsDescription" id="newsDescription" placeholder="Текст новости"/>
                  </FormGroup>
                  <FormGroup >
                    <Button color="info">Добавить новость</Button>
                  </FormGroup>
                </Form>
        </Col>
        </Row>
    </div>
    );
  }
}

export default AdminNews;