import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import ListGroup from 'react-bootstrap/ListGroup';
import './left-menu.css';
import Can from "../../utils/can";

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
                <ListGroup.Item className={this.isActive('reports')} as={Link} to="/reports" eventKey="reports" >
                    Отчеты
                </ListGroup.Item>
                <ListGroup.Item className={this.isActive('employees')} as={Link} to="/employees" eventKey="employees" >
                    Сотрудники
                </ListGroup.Item>
                <Can
                    roles={this.props.roles}
                    perform="transactions:visit"
                    yes={() => (
                        <ListGroup.Item className={this.isActive('transactions')} as={Link} to="/transactions" eventKey="transactions">
                            Транзакции
                        </ListGroup.Item>
                    )}
                    no={() => null}
                />
                <Can
                    roles={this.props.roles}
                    perform="expenditures:visit"
                    yes={() => (
                        <ListGroup.Item className={this.isActive('expenditures')} as={Link} to="/expenditures" eventKey="expenditures">
                            Статьи расходов
                        </ListGroup.Item>
                    )}
                    no={() => null}
                />
                <Can
                    roles={this.props.roles}
                    perform="requests:visit"
                    yes={() => (
                        <ListGroup.Item className={this.isActive('requests')} as={Link} to="/requests" eventKey="requests" >
                            Запросы ДС
                        </ListGroup.Item>
                    )}
                    no={() => null}
                />
            </ListGroup>
        );
    }
}

const mapStateToProps = ({ commonInfo, auth }) => {
    const { selected } = commonInfo;
    const { roles } = auth;
    return { selected, roles };
};

export default connect(mapStateToProps)(LeftMenu);
