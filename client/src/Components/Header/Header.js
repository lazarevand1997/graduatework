import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import CheckTicket from "../CheckTicket/CheckTicket";
import "./Header.css";
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      modal: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleModal(e) {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <Navbar dark expand="md">
        <NavbarBrand href="/">Дом Культуры</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/#newsblock">Новости</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/events">Расписание</NavLink>
            </NavItem>
            <NavItem>
              <text onClick={this.toggleModal}  className="nav-link ticket-check-button">
                Проверить билет
              </text>
            </NavItem>
          </Nav>
        </Collapse>

        <Modal isOpen={this.state.modal} toggle={this.toggleModal} centered={true} className={this.props.className} >
             <ModalHeader toggle={this.toggleModal}>Проверить билет</ModalHeader>
             <ModalBody>
                <CheckTicket />
             </ModalBody>
        </Modal>
      </Navbar>
    );
  }
}
