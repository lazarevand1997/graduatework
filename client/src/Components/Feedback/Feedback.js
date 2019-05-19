import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import "./Feedback.css";

class Feedback extends Component {

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
                                <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Имя" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Телефон" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="textarea" name="text" id="exampleText" placeholder="Сообщение"/>
                            </FormGroup>
                            <Button color="primary" size="lg">Отправить</Button>
                        </Form>
                    </div>
                </div>
            </Parallax>
      </div>
    );
  }
}

export default Feedback;