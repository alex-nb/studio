import React, { Component } from 'react';
import {Button, Form} from "react-bootstrap";
import {addEmployee, getDepartments} from "../../../actions/employees";
import {connect} from "react-redux";
import Spinner from "../../layout/spinner";
import ErrorMessage from "../../layout/error-message";
import {withRouter} from "react-router-dom";

class CreateEmployee extends Component {
    state = {
        email: '',
        lastName: '',
        firstName: '',
        secondName: '',
        dept: '',
        birthday: ''
    };

    componentDidMount() {
        this.props.getDepartments();
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addEmployee(this.state, this.props.history);
    };

    _departmentsList() {
        if (this.props.onlyDepartment) {
            return  this.props.onlyDepartment.map((dept) => {
                return (<option key={dept.id} value={dept.id}>{dept.title}</option>);
            });
        }
        return null;
    };

    render() {
        if (this.props.loadingOnlyDepartment) return (<div className="col-md-10 float-right"><Spinner/></div>);
        if (this.props.errorOnlyDepartment) return (<div className="col-md-10 float-right"><ErrorMessage/></div>);
        return (
            <div className="col-md-10 float-right">
                <Form onSubmit={this.onSubmit}>
                    <legend>Новый пользователь</legend>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required type="email" placeholder="Email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            type="text" placeholder="Фамилия нового сотрудника"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            required type="text" placeholder="Имя нового сотрудника"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Отчество</Form.Label>
                        <Form.Control
                            type="text" placeholder="Отчество нового сотрудника"
                            name="secondName"
                            value={this.state.secondName}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Отдел</Form.Label>
                        <Form.Control as="select"
                          required
                          name="dept"
                          value={this.state.dept}
                          onChange={this.onChange}
                        >
                            <option disabled hidden/>
                            {this._departmentsList()}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Дата рождения</Form.Label>
                        <Form.Control
                            required type="date"
                            name="birthday"
                            value={this.state.birthday}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary">Создать</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({ employeesList }) => {
    const {
        onlyDepartment, loadingOnlyDepartment, errorOnlyDepartment
    } = employeesList;
    return {
        onlyDepartment, loadingOnlyDepartment, errorOnlyDepartment
    };
};

export default connect(mapStateToProps, {addEmployee, getDepartments})(withRouter(CreateEmployee));