import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";

import './auth.css';

class Login extends Component {

    state = {
        loginForm: {
            email: '',
            password: ''
        }
    };

    inputChangeHandler = (e) => {
        const input = e.target.name;
        const value = e.target.value;
        this.setState(prevState => {
            const updatedForm = {
                ...prevState.loginForm,
                [input]: value
            };
            return {
                loginForm: updatedForm
            };
        });
    };

    render() {
        return (
            <div className="background-login-page">
                <div className="login-form">
                    <Form onSubmit={e => this.props.onLogin(e, {
                        email: this.state.loginForm.email,
                        password: this.state.loginForm.password})}>
                        <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                required type="email"
                                name="email"
                                value={this.state.loginForm['email']}
                                onChange={this.inputChangeHandler}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                required type="password"
                                name="password"
                                value={this.state.loginForm['password']}
                                onChange={this.inputChangeHandler}
                            />
                        </Form.Group>
                        <Button className="button-submit" type="submit" variant="primary" disabled={this.props.loading}>{this.props.loading ? 'Секунду...' : 'Вход'}</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;
