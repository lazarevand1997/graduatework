import React, { Component } from 'react';
import { Button, Row, Col , Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";
import "./AdminMain.css";


class AdminMain extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.state = {
      username: null,
      email: null,
      reg_login: "",
      reg_mail: "",
      reg_password: "",
      sended: false
    };
  }

  handleLogin(e) {
    this.setState({ reg_login: e.target.value });
  };

  handleEmail(e) {
    this.setState({ reg_mail: e.target.value });
  };

  handlePassword(e) {
    this.setState({ reg_password: e.target.value });
  };

  signUp() {
    if((this.state.reg_login !== '') && (this.state.reg_mail !== '')
    && (this.state.reg_password !== '')){
        axios
          .post("/api/signup", {
            login: this.state.reg_login,
            email: this.state.reg_mail,
            password: this.state.reg_password,
          })
          .then(res => {
            if(res.data.command === "INSERT"){
                this.setState({ sended: true});
            } else {
                this.setState({ sended: false });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
            console.log('form not valid');
      }
  };

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
                  <p>Имя пользователя: {username}</p>
                  <p>E-mail: {email}</p>
                  <p><Button onClick={this.logout.bind(this)} color="warning">Выйти</Button></p>
                </div>
              </Col>
              <Col sm="6">
                <h3 className="mt-4 mb-1">Добавить пользователя</h3>
                <p className="mt-1 mb-3">Для подтверждения обратитесь к системному администратору</p>
                <Form>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                      <Label for="userName">Имя пользователя</Label>
                      <Input onChange={this.handleLogin} type="text" name="userName" id="userName" placeholder=""/>
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="Password">Пароль</Label>
                        <Input onChange={this.handlePassword} type="password" name="password" id="Password" placeholder="" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input onChange={this.handleEmail} type="email" name="email" id="exampleEmail" placeholder="" />
                  </FormGroup>
                  <FormGroup >
                    <Button onClick={this.signUp.bind(this)} color="info">Добавить нового пользователя</Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
      </div>
    );
  }
}

export default AdminMain;
