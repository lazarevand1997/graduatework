import React, { Component } from 'react';
import classnames from 'classnames';
import axios from "axios";
import AdminMain from "../Components/AdminMain/AdminMain";
import AdminNews from "../Components/AdminNews/AdminNews";
import AdminEvents from "../Components/AdminEvents/AdminEvents";
import AdminLogin from "../Components/AdminLogin/AdminLogin";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';


class AdminPage extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1',
          isadmin:false,
        };
    }
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
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
              isadmin: res.data.isadmin
            });
          }
        })
        .catch(err => console.log(err));
      }
  

  render() {
    let isadmin = this.state.isadmin;
    if (isadmin) {
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
    } else {
      return (
        <div className="mt-2">
          <AdminLogin />
        </div>
      );
    }
  }
}

export default AdminPage;