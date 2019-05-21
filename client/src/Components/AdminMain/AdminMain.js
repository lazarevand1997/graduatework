import React, { Component } from 'react';
import { Button, Row, Col , Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";
import "./AdminMain.css";


class AdminMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
    };
  }

  logout() {
    localStorage.removeItem("access_token");
    window.location.href = "/admin";
  }

  componentDidMount() {
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "access_token"
    );
    axios
      .get("/api/check")
      .then(res => {
        if (res.data.username) {
          this.setState({
            username: res.data.username,
            email: res.data.email
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    let username = this.state.username;
    let email = this.state.email;
    return (
      <div className="container">
        <Row>
              <Col sm="6">
                <img className="admin-img" src={require("../../Images/admin.png")} alt="admin"/>
                <div className="mt-3">
                  <p>UserName: {username}</p>
                  <p>E-mail: {email}</p>
                  <p><Button color="info">Изменить пароль</Button></p>
                  <p><Button onClick={this.logout.bind(this)} color="warning">Выйти</Button></p>
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