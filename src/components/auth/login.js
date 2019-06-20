import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

import './auth.css';
import {connect} from "react-redux";

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

    onSubmit = async e => {
        e.preventDefault();
        this.props.login(this.state.loginForm.email, this.state.loginForm.password);
    };

    render() {
        if (this.props.isAuth) {
            return <Redirect to='/' />;
        }

        return (
            <div className="background-login-page">
                <div className="login-form">
                    <Form onSubmit={this.onSubmit}>
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
                        <Button className="button-submit" type="submit" variant="primary" disabled={this.props.authLoading}>{this.props.authLoading ? 'Секунду...' : 'Вход'}</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { isAuth, authLoading,  } = auth;
    return { isAuth, authLoading };
};

export default connect(mapStateToProps, { login })(Login);
