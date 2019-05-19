import React, { Component } from 'react';
import "./News.css";
import { Card, Button, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody } from 'reactstrap';

class News extends Component {

  render() {
    return (
      <div className="container-fluid news">
        <div className="text-left">
          <h1 className="news-title">Последние новости</h1>
        </div>
        <div className="container pt-5">
        <CardDeck>
            <Card>
                <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                <Button>Button</Button>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Button</Button>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
                <Button>Button</Button>
                </CardBody>
            </Card>
        </CardDeck>
        </div>
      </div>
    );
  }
}

export default News;