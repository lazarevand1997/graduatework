import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";


class AdminCirclesChange extends Component {
    constructor(props) {
        super(props);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.state = {
          title: this.props.title,
          description: this.props.description,
          circle_id: this.props.circleId,
        };
      }

    handleTitle(e) {
        this.setState({ title: e.target.value });
    };

    handleDescription(e) {
        this.setState({ description: e.target.value });
    };

    updateCircle() {
        axios.defaults.headers.common.authorization = localStorage.getItem(
            "access_token"
          );
        axios
            .post("/api/updatecircle", {
                circleId: this.state.circle_id,
                title: this.state.title,
                description: this.state.description
            })
            .then(res => {
              if (res) {
                console.log(res);
              }
            })
            .catch(err => console.log(err));
      }


  render() {
      let title = this.state.title;
      let description = this.state.description;
    return (
      <div>
          <Form>
            <FormGroup>
            <Label for="circlesmodaltext">Название</Label>
            <Input onChange={this.handleTitle} type="text" name="circlesmodaltext" id="circlesmodaltext" value={title} />
            </FormGroup>
            <FormGroup>
            <Label for="textmodaldesc">Описание</Label>
            <Input onChange={this.handleDescription} type="text" name="textmodaldesc" id="textmodaldesc" value={description} />
            </FormGroup>
            <div className="text-center">
                <Button onClick={this.updateCircle.bind(this)} color="info">Сохранить изменения</Button>
            </div>
        </Form>
      </div>
    );
  }
}

export default AdminCirclesChange;
