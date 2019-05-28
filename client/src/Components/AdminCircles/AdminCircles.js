import React, { Component } from "react";
import {
  Toast,
  ToastBody,
  ToastHeader,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import axios from "axios";
import $ from "jquery";
import "./AdminCircles.css";
import AdminCirclesChange from "./AdminCirclesChange";

class AdminCircles extends Component {
  constructor(props) {
    super(props);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      data: [],
      title: null,
      description: null,
      nice_add: false,
      modal: false,
      modal_id: null,
      modal_title: null,
      modal_desc: null
    };
  }

  toggle(e) {
    let element = $(e.currentTarget);
    let modal_id = $(element).data("id");
    let modal_title = $(element).data("title");
    let modal_desc = $(element).data("description");
    this.setState(prevState => ({
      modal_id: modal_id,
      modal_title: modal_title,
      modal_desc: modal_desc,
      modal: !prevState.modal
    }));
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "access_token"
    );
    axios
      .get("/api/showallcircles")
      .then(res => {
        if (res) {
          this.setState({
            data: res.data
          });
        }
      })
      .catch(err => console.log(err));
  }

  handleTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleDescription(e) {
    this.setState({ description: e.target.value });
  }

  sendCircle() {
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "access_token"
    );
    axios
      .post("/api/addcircle", {
        title: this.state.title,
        description: this.state.description
      })
      .then(res => {
        if (res.data.status === "success") {
          this.setState({ nice_add: true });
          axios.defaults.headers.common.authorization = localStorage.getItem(
            "access_token"
          );
          axios
            .get("/api/showallcircles")
            .then(res => {
              if (res) {
                this.setState({
                  data: res.data
                });
              }
            })
            .catch(err => console.log(err));
        } else {
          this.setState({ nice_add: false });
        }
      })
      .catch(err => console.log(err));
  }

  deleteCircle(e) {
    let element = $(e.currentTarget);
    let id_circle = $(element).data("id");
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "access_token"
    );
    axios
      .post("/api/delcircle", {
        circleId: id_circle
      })
      .then(res => {
        if (res) {
          axios.defaults.headers.common.authorization = localStorage.getItem(
            "access_token"
          );
          axios
            .get("/api/showallcircles")
            .then(res => {
              if (res) {
                this.setState({
                  data: res.data
                });
              }
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "access_token"
    );
    axios
      .get("/api/showallcircles")
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
      <div className="container mt-3">
        <Row>
          <Col sm="6">
            {this.state.data.map((item, key) => {
              let circleItem = JSON.parse(item);
              return (
                <div key={key} className="admin-circle-wrapper mt-4">
                  <Toast>
                    <ToastHeader>{circleItem.title}</ToastHeader>
                    <ToastBody>
                      {circleItem.description}
                    </ToastBody>
                  </Toast>
                  <div className="text-center">
                    <Button
                      data-id={circleItem.circle_id}
                      data-title={circleItem.title}
                      data-description={circleItem.description}
                      onClick={this.toggle}
                      color="info"
                    >
                      Изменть
                    </Button>{" "}
                    <Button
                      data-id={circleItem.circle_id}
                      onClick={this.deleteCircle.bind(this)}
                      color="warning"
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              );
            })}
          </Col>
          <Col sm="6">
            <h3 className="mt-4 mb-4">Добавить кружок</h3>
            <Form>
              <FormGroup>
                <Input
                  onChange={this.handleTitle}
                  type="text"
                  name="circlesTitle"
                  id="circlesTitle"
                  placeholder="Заголовок"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  onChange={this.handleDescription}
                  type="textarea"
                  name="circleDescription"
                  id="circleDescription"
                  placeholder="Описание кружка"
                />
              </FormGroup>
              <FormGroup>
                <Button onClick={this.sendCircle.bind(this)} color="info">
                  Добавить кружок
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          centered={true}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Изменить кружок</ModalHeader>
          <ModalBody>
            <AdminCirclesChange
              circleId={this.state.modal_id}
              title={this.state.modal_title}
              description={this.state.modal_desc}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AdminCircles;
