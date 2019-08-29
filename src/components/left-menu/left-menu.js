import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ListGroup from 'react-bootstrap/ListGroup';

import './left-menu.css';
import {connect} from "react-redux";
//import {changeSelected} from "../../actions/common-info";

class LeftMenu extends Component {

    state = {
        selected: ''
    };

    isActive(value) {
        return ((value===this.state.selected) ? 'active':'');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.selected !== this.props.selected) this.setState({selected: this.props.selected});
    }

    render() {
        return (
            <ListGroup className="col-md-2">
                <ListGroup.Item className={this.isActive('projects')} as={Link} to="/projects/" eventKey="projects" >
                    Проекты
                </ListGroup.Item>
                <ListGroup.Item className={this.isActive('employees')} as={Link} to="/employees" eventKey="employees" >
                    Сотрудники
                </ListGroup.Item>
                <ListGroup.Item className={this.isActive('balance')} as={Link} to="/balance" eventKey="balance">
                    Баланс студии
                </ListGroup.Item>
                <ListGroup.Item className={this.isActive('expenditure')} as={Link} to="/expenditure" eventKey="expenditure">
                    Статьи расходов
                </ListGroup.Item>
                <ListGroup.Item className={this.isActive('requests')} as={Link} to="/requests" eventKey="requests" >
                    Запросы ДС
                </ListGroup.Item>
                <ListGroup.Item className={this.isActive('reports')} as={Link} to="/reports" eventKey="reports" >
                    Отчеты
                </ListGroup.Item>
            </ListGroup>
        );
    }
}

const mapStateToProps = ({ commonInfo }) => {
    const { selected } = commonInfo;
    return { selected };
};

export default connect(mapStateToProps)(LeftMenu);
