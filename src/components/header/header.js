import React, { Component } from 'react';
//import { compose } from '../../utils';
import { connect } from 'react-redux';
import { fetchPersonalInfo } from '../../actions/personal-info';
//import { withBdApiService } from '../hoc';

import {Balance, AskMoney} from '../top-panel';
import ErrorMessage from "../error-message";

import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import './header.css';

class Header extends Component {

    state = {
        modalAskMoney: false
    };

    componentDidMount() {
        console.log(this.props.fetchPersonalInfo);
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
                                <NavDropdown.Item onClick={this.props.onLogout}>Выход</NavDropdown.Item>
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

const mapStateToProps = ({ personalInfo, loadingPersonalInfo, errorPersonalInfo }) => {
    console.log('map state');
    return { personalInfo, loadingPersonalInfo, errorPersonalInfo };
};

const mapDispatchToProps = (dispatch, { bdApiService }) => {
    console.log('mad dispatch');
    return {
        fetchPersonalInfo: fetchPersonalInfo(bdApiService, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);