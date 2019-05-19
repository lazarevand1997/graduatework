import React, { Component } from 'react';
import classnames from 'classnames';
import AdminMain from "../Components/AdminMain/AdminMain";
import AdminNews from "../Components/AdminNews/AdminNews";
import AdminEvents from "../Components/AdminEvents/AdminEvents";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';


class HomePage extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1'
        };
    }
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }

  render() {
    return (
      <div className="mt-2">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Панель администратора
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Новости
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              События
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <AdminMain/>
          </TabPane>
          <TabPane tabId="2">
            <AdminNews/>
          </TabPane>
          <TabPane tabId="3">
            <AdminEvents/>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default HomePage;