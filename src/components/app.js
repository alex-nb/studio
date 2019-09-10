import React, {Component, Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from "react-redux";
import Routes from './routing/routes';

import Header from './header';
import LeftMenu from "./left-menu";

class App extends Component {

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