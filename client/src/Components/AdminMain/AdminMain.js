import React, { Component } from 'react';
import { Button, Row, Col , Form, FormGroup, Label, Input } from 'reactstrap';
import "./AdminMain.css";


class AdminMain extends Component {

  render() {
    return (
      <div>
        <Row>
              <Col sm="6">
                <img className="admin-img" src={require("../../Images/admin.png")} alt="admin"/>
                <div className="mt-3">
                  <p>UserName: admin</p>
                  <p>E-mail: laza@sd.com</p>
                  <p>Admin: true</p>
                  <p><Button color="info">Изменить пароль</Button></p>
                  <p><Button color="warning">Выйти</Button></p>
                </div>
              </Col>
              <Col sm="6">
                <h3 className="mt-4 mb-4">Добавить пользователя</h3>
                <Form>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                      <Label for="userName">User name</Label>
                      <Input type="text" name="userName" id="userName" placeholder="User name"/>
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="Password">Password</Label>
                        <Input type="password" name="password" id="Password" placeholder="password" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" id="checkbox2" />{' '}
                      Admin
                    </Label>
                  </FormGroup>
                  <FormGroup >
                    <Button color="info">Add user</Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
      </div>
    );
  }
}

export default AdminMain;