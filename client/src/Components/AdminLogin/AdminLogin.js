import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import axios from "axios";

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {
          log_login: "",
          log_password: "",
          wrong_log: false,
        };
      }

    handleLoginChange(e) {
        this.setState({ log_login: e.target.value });
    };

    handlePasswordChange(e) {
        this.setState({ log_password: e.target.value });
    };

    signIn() {
            axios
              .post("/api/signin", {
                login: this.state.log_login,
                password: this.state.log_password
              })
              .then(res => {
                if (res.data.access_token) {
                    localStorage.setItem("access_token", res.data.access_token);
                    this.setState({
                      user_name: res.data.user_name,
                      wrong_log: false
                    });
                    window.location.href = "/admin";
                } else {
                    this.setState({
                      wrong_log: true
                    });
                }
              })
              .catch(function(error) {
                console.log(error);
              });
    };


  render() {
    return (
      <div className="container mt-5 pt-5">
        <Row>
            <Col></Col>
            <Col>
                <h3 className="pb-3">Панель анминистратора</h3>
                <Form>
                    <FormGroup>
                    <Input onChange={this.handleLoginChange} type="text" name="adminLogin" id="adminLogin" placeholder="Имя пользователя" />
                    </FormGroup>
                    <FormGroup>
                    <Input onChange={this.handlePasswordChange} type="password" name="password" id="examplePassword" placeholder="Пароль" />
                    </FormGroup>
                    <Button onClick={this.signIn.bind(this)}>Войти</Button>
                </Form>
            </Col>
            <Col></Col>
        </Row>
      </div>
    );
  }
}

export default AdminPage;
