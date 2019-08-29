import React, {Component, Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from "react-redux";
import axios from 'axios';
import Routes from './routing/routes';

import Header from './header';
import LeftMenu from "./left-menu";

axios.defaults.baseURL = 'http://localhost:8000';
if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}
else {
    delete axios.defaults.headers.common['Authorization'];
}

class App extends Component {

    /*componentDidMount() {
        axios.defaults.baseURL = 'http://localhost:8000';
        if (localStorage.getItem('token')) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        }
        else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }*/

    getMenu = () => {
        return (
            <Fragment>
                <Header/>
                <LeftMenu />
            </Fragment>
        );
    };


    render() {
        return (
            <Fragment>
                {this.props.isAuth && this.getMenu()}
                <Switch>
                    <Route component={Routes} />
                </Switch>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { isAuth, error } = auth;
    return { isAuth, error };
};

export default connect(mapStateToProps)(App);