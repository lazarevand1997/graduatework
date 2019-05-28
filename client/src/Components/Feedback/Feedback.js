import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import axios from "axios";

import "./Feedback.css";

class Feedback extends Component {

    constructor(props) {
        super(props);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.state = {
          email: null,
          name: null,
          phone: null,
          message: null,
          sended: false
        };
      }

      handleEmail(e) {
        this.setState({ email: e.target.value });
      }

      handleName(e) {
        this.setState({ name: e.target.value });
      }

      handlePhone(e) {
        this.setState({ phone: e.target.value });
      }

      handleMessage(e) {
        this.setState({ message: e.target.value });
      }

    postfeedback() {
        axios.defaults.headers.common.authorization = localStorage.getItem(
          "access_token"
        );
        axios
          .post("/api/postmail", {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            message: this.state.message,
          })
          .then(res => {
            this.setState({
                sended: true,
              });
          })
          .catch(err => console.log(err));
      }

  render() {
    return (
      <div className=" feedback-wrapper">
            <Parallax
                bgImage={require('../../Images/miet.jpg')}
                bgImageAlt="miet"
                strength={200}
            >
                <div style={{ background: `rgba(0, 0, 0, 0.3)`, height: '100vh' }} >
                    <div className="feedback-form">
                        <h1 className="feedback-title">Обратная связь</h1>
                        <Form>
                            <FormGroup>
                                <Input onChange={this.handleEmail} type="email" name="email" id="exampleEmail" placeholder="Email" />
                            </FormGroup>
                            <FormGroup>
                                <Input onChange={this.handleName} type="text" name="namefeed" id="namefeed" placeholder="Имя" />
                            </FormGroup>
                            <FormGroup>
                                <Input onChange={this.handlePhone} type="text" name="phonefeed" id="phonefeed" placeholder="Телефон" />
                            </FormGroup>
                            <FormGroup>
                                <Input onChange={this.handleMessage} type="textarea" name="text" id="exampleText" placeholder="Сообщение"/>
                            </FormGroup>
                            <Button  onClick={this.postfeedback.bind(this)} color="primary" size="lg">Отправить</Button>
                        </Form>
                    </div>
                </div>
            </Parallax>
      </div>
    );
  }
}

export default Feedback;
