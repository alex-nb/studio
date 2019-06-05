import React, { Component } from 'react';

import { Form, Button } from "react-bootstrap";

class Signup extends Component {
    state = {
        signupForm: {
            email: '',
            password: '',
            name: ''
        }
    };

    inputChangeHandler = (e) => {
        const input = e.target.name;
        const value = e.target.value;
        this.setState(prevState => {
            const updatedForm = {
                ...prevState.signupForm,
                [input]: value
            };
            return {
                signupForm: updatedForm
            };
        });
    };

    render() {
        return (
                <Form onSubmit={e => this.props.onSignup(e, this.state)}>
                    <Form.Group>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            required type="email"
                            name="email"
                            value={this.state.signupForm['email']}
                            onChange={this.inputChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            required type="text"
                            name="name"
                            value={this.state.signupForm['name']}
                            onChange={this.inputChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            required type="password"
                            name="password"
                            value={this.state.signupForm['password']}
                            onChange={this.inputChangeHandler}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary"  disabled={this.props.loading}>{this.props.loading ? 'Секунду...' : 'Зарегистрироваться'}</Button>
                </Form>
        );
    }
}

export default Signup;
