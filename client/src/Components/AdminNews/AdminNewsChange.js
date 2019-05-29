import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";


class AdminNewsChange extends Component {
    constructor(props) {
        super(props);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.state = {
          title: this.props.title,
          description: this.props.description,
          news_id: this.props.newsId,
        };
      }

    handleTitle(e) {
        this.setState({ title: e.target.value });
    };

    handleDescription(e) {
        this.setState({ description: e.target.value });
    };

    updateNews() {
        axios.defaults.headers.common.authorization = localStorage.getItem(
            "access_token"
          );
        axios
            .post("/api/updatenews", {
                newsId: this.state.news_id,
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
            <Label for="newsmodaltext">Название</Label>
            <Input onChange={this.handleTitle} type="text" name="newsmodaltext" id="newsmodaltext" value={title} />
            </FormGroup>
            <FormGroup>
            <Label for="textmodaldesc">Описание</Label>
            <Input onChange={this.handleDescription} type="textarea" name="textmodaldesc" id="textmodaldesc" value={description} />
            </FormGroup>
            <div className="text-center">
                <Button onClick={this.updateNews.bind(this)} color="info">Сохранить изменения</Button>
            </div>
        </Form>
      </div>
    );
  }
}

export default AdminNewsChange;
