import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import './app.css';

import Header from '../header';
import ProjectsPage from '../projects-page';
import { Transaction, Expenditure, Requests } from "../finance";
import LeftMenu from "../left-menu";
import EmployeesPage from "../employees-page";
import Reports from "../reports";
import CreateEmployee from "../employees-page/create-employee";
import EditProject from "../projects-page/edit-project";
import LoginPage from '../auth/login';
import SignupPage from '../auth/signup';



export default class App extends Component {
    state = {
        isAuth: false,
        token: null,
        userId: null,
        authLoading: false,
        error: null,
        //balance: null
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        const expiryDate = localStorage.getItem('expiryDate');
        if (!token || !expiryDate) {
            return;
        }
        if (new Date(expiryDate) <= new Date()) {
            this.logoutHandler();
            return;
        }
        const userId = localStorage.getItem('userId');
        const balance = localStorage.getItem('balance');
        const remainingMilliseconds =
            new Date(expiryDate).getTime() - new Date().getTime();
        this.setState({ isAuth: true, token: token, userId: userId });
        this.setAutoLogout(remainingMilliseconds);
    }

    logoutHandler = () => {
        this.setState({ isAuth: false, token: null });
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('userId');
        //localStorage.removeItem('balance');
    };

    setAutoLogout = milliseconds => {
        setTimeout(() => {
            this.logoutHandler();
        }, milliseconds);
    };

    signupHandler = (event, authData) => {
        event.preventDefault();
        this.setState({ authLoading: true });
        fetch('http://localhost:8080/auth/signup', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: authData.signupForm.email,
                password: authData.signupForm.password,
                name: authData.signupForm.name
            })
        })
            .then(res => {
                if (res.status === 422) {
                    throw new Error(
                        "Validation failed. Make sure the email address isn't used yet!"
                    );
                }
                if (res.status !== 200 && res.status !== 201) {
                    console.log('Error!');
                    throw new Error('Creating a user failed!');
                }
                return res.json();
            })
            .then(resData => {
                console.log(resData);
                this.setState({ isAuth: false, authLoading: false });
                this.props.history.replace('/');
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isAuth: false,
                    authLoading: false,
                    error: err
                });
            });
    };

    loginHandler = (event, authData) => {
        event.preventDefault();
        this.setState({ authLoading: true });
        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: authData.email,
                password: authData.password
            })
        })
            .then(res => {
                if (res.status === 422) {
                    throw new Error('Validation failed.');
                }
                if (res.status !== 200 && res.status !== 201) {
                    console.log('Error!');
                    throw new Error('Could not authenticate you!');
                }
                return res.json();
            })
            .then(resData => {
                this.setState({
                    isAuth: true,
                    token: resData.token,
                    authLoading: false,
                    userId: resData.userId
                });
                localStorage.setItem('token', resData.token);
                localStorage.setItem('userId', resData.userId);
                //localStorage.setItem('balance', resData.balance);
                const remainingMilliseconds = 60 * 60 * 1000;
                const expiryDate = new Date(
                    new Date().getTime() + remainingMilliseconds
                );
                localStorage.setItem('expiryDate', expiryDate.toISOString());
                this.setAutoLogout(remainingMilliseconds);
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isAuth: false,
                    authLoading: false,
                    error: err
                });
            });
    };

    render() {
        let routes = (
            <Switch>
                <Route
                    path="/"
                    exact
                    render={props => (
                        <LoginPage
                            {...props}
                            onLogin={this.loginHandler}
                            loading={this.state.authLoading}
                        />
                    )}
                />
                <Route
                    path="/signup"
                    exact
                    render={props => (
                        <SignupPage
                            {...props}
                            onSignup={this.signupHandler}
                            loading={this.state.authLoading}
                        />
                    )}
                />
                <Redirect to="/" />
            </Switch>
        );
        if (this.state.isAuth) {
            //console.log(this.state);
            routes = (
                <div>
                    <Header onLogout={this.logoutHandler} />
                    <LeftMenu />
                    <div className="col-md-10 float-right">
                        <Switch>
                            <Route path="/"
                                   exact
                                   render={() => <h2>Welcome</h2> }
                            />
                            <Route path="/projects" exact render={() => <ProjectsPage/>} />
                            <Route path="/projects/:id" render={({ match }) => {
                                const { id } = match.params;
                                return <EditProject projectId={id} />
                            }} />
                            <Route path="/employees" component={EmployeesPage} />
                            <Route path="/create_employee" component={CreateEmployee} />
                            <Route path="/balance" component={Transaction} />
                            <Route path="/expenditure" component={Expenditure} />
                            <Route path="/requests" component={Requests} />
                            <Route path="/reports" component={Reports} />
                            <Route render={() => <h2>Page not found</h2>} />
                        </Switch>
                    </div>
                </div>

            );
        }
        return(<div>{routes}</div>);
    }
}