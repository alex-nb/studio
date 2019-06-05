import React, { Component } from 'react';
import {Button, Form} from "react-bootstrap";
import { withBdApiService } from "../../hoc";
import {employeeNewAdd} from '../../../actions';
import {connect} from "react-redux";
import {compose} from "../../../utils";

class CreateEmployee extends Component {
    state = {
        email: '',
        lastName: '',
        firstName: '',
        secondName: '',
        dept: [],
        birthday: ''
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSelectChange = (e) => {
        const options = e.target.options;
        const value = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) value.push(options[i].value);
        }
        this.setState({dept: value});
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { email, lastName, firstName, secondName, dept, birthday }  = this.state;
        console.log("on Submit");
        /*this.setState({
            email: '',
            lastName: '',
            firstName: '',
            secondName: '',
            dept: [],
            birthday: ''
        });*/
        //console.log(onAdd);
        this.props.onAdd({lastName: lastName, firstName: firstName, secondName: secondName});
        //this.props.history.push("/employees");
    };


    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <legend>Новый пользователь</legend>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required type="email" placeholder="Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control
                        required type="text" placeholder="Фамилия нового сотрудника"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.onInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control
                        required type="text" placeholder="Имя нового сотрудника"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.onInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Отчество</Form.Label>
                    <Form.Control
                        required type="text" placeholder="Отчество нового сотрудника"
                        name="secondName"
                        value={this.state.secondName}
                        onChange={this.onInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Отдел</Form.Label>
                    <Form.Control as="select"
                          multiple required
                          name="dept"
                          value={this.state.dept}
                          onChange={this.onSelectChange}
                    >
                        <option>Design</option>
                        <option>Programming</option>
                        <option>Typesetting</option>
                        <option>SEO</option>
                        <option>Project management</option>
                        <option>Studio</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Дата рождения</Form.Label>
                    <Form.Control
                        required type="date"
                        name="birthday"
                        value={this.state.birthday}
                        onChange={this.onInputChange}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">Создать</Button>
            </Form>

        );
    }
}

const mapStateToProps = ({ allEmployeesList }) => {
    return { allEmployeesList };
};

const mapDispatchToProps = () => {
    return {
        onAdd: employeeNewAdd
    };
};

export default compose(
    withBdApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(CreateEmployee);