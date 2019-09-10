import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { logout } from '../../actions/auth';

import {Balance, AskMoney} from '../top-panel';

import './header.css';

class Header extends Component {

    state = {
        showModalAskMoney: false
    };

    changeStateModalEditForm = () => {
        this.setState({ showModalAskMoney: !this.state.showModalAskMoney })
    };

    render () {
        return (
            <Fragment>
                <Navbar collapseOnSelect expand="lg" bg="primary" className="navbar-dark" >
                    <Navbar.Brand as={Link} to="/">Studio</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="navbarColor01">
                        <Nav className="mr-auto header-menu">
                            <Nav.Link active eventKey="balance">
                                <Balance />
                            </Nav.Link>
                            <NavDropdown active title={<i className="far fa-user fa-2x fa-menu"/>} id="collasible-nav-dropdown" alignRight>
                                <NavDropdown.Item href="/profile">Профиль</NavDropdown.Item>
                                <NavDropdown.Item onClick={this.changeStateModalEditForm}>Запрос ДС</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={this.props.logout}>Выход</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <AskMoney
                    show={this.state.showModalAskMoney}
                    onHide={this.changeStateModalEditForm}
                />
            </Fragment>
        );
    }
}

export default connect(null, {logout})(Header);