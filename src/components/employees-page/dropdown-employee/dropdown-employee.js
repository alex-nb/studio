import React, { Component } from 'react';
import { FormControl, Dropdown } from 'react-bootstrap';

import './dropdown-employee.css';
import {Link} from "react-router-dom";

class CustomToggle extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();

        this.props.onClick(e);
    }

    render() {
        return (
            <a href="" onClick={this.handleClick}>
                {this.props.children}
            </a>
        );
    }
}

class CustomMenu extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = { value: '' };
    }

    handleChange(e) {
        this.setState({ value: e.target.value.toLowerCase().trim() });
    }

    render() {
        const {
            children,
            style,
            className,
            'aria-labelledby': labeledBy,
        } = this.props;

        const { value } = this.state;

        return (
            <div style={style} className={className} aria-labelledby={labeledBy}>
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Name employee..."
                    onChange={this.handleChange}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        child =>
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    }
}

export default class DropdownEmployee extends Component {
    render () {
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    <i className="fas fa-user-plus dropdown-element"/>
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>
                    {this.props.allEmployees.map(
                        (employee) => (<Dropdown.Item key={employee.id} eventKey={employee.id} >{employee.name}</Dropdown.Item>)
                    )}
                    <Dropdown.Divider> </Dropdown.Divider>
                    <Dropdown.Item as={Link} to="/create_employee" eventKey="0" >New</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    };
}

