import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { fetchPersonalInfo } from '../../actions/personal-info';
import { logout } from '../../actions/auth';

import {Balance, AskMoney} from '../top-panel';
import ErrorMessage from "../layout/error-message";

import './header.css';

class Header extends Component {

    state = {
        modalAskMoney: false
    };

    componentDidMount() {
        this.props.fetchPersonalInfo();
    }

    render () {
        const modalAskMoney = () => this.setState({ modalAskMoney: false });
        const { personalInfo, loadingPersonalInfo, errorPersonalInfo } = this.props;

        if (errorPersonalInfo) {
            return <ErrorMessage/>;
        }

        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="primary" className="navbar-dark" >
                    <Navbar.Brand as={Link} to="/">Studio</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="navbarColor01">
                        <Nav className="mr-auto header-menu">
                            <Nav.Link active eventKey="balance">
                                {!loadingPersonalInfo ? (<Balance balanceHistory={personalInfo.balanceHistory} balance={personalInfo.balance} />) : null}
                            </Nav.Link>
                            <NavDropdown active title={<i className="far fa-user fa-2x fa-menu"/>} id="collasible-nav-dropdown" alignRight>
                                <NavDropdown.Item href="#profil">Профиль</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.setState({ modalAskMoney: true })}>Запрос ДС</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={this.props.logout}>Выход</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <AskMoney
                    show={this.state.modalAskMoney}
                    onHide={modalAskMoney}
                />
            </>
        );
    }
}

const mapStateToProps = ({ personal_info }) => {
    const { personalInfo, loadingPersonalInfo, errorPersonalInfo } = personal_info;
    return { personalInfo, loadingPersonalInfo, errorPersonalInfo };
};

export default connect(mapStateToProps, {fetchPersonalInfo, logout})(Header);