import React, {Component, Fragment} from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {changeSelected} from '../../actions/common-info';
import PrivateRoute from './private-route';
import Welcome from '../layout/welcome';
import NotFound from '../layout/not-found';
import Alert from '../layout/alert';
import LoginPage from '../auth/login';
import ProjectsPage from '../projects-page';
import EditProject from "../projects-page/edit-project";
import CloseProject from "../projects-page/close-project";
import Reports from "../reports";
import { Transactions, Expenditures, Requests } from "../finance";
import EmployeesPage from "../employees-page";
import CreateEmployee from "../employees-page/create-employee";


class Routes extends Component {

    render() {
        return (
            <Fragment>
                <Alert/>
                <Switch>
                    <Route path="/login" exact component={LoginPage}/>
                    <PrivateRoute path="/" exact component={() => {
                        this.props.changeSelected('');
                        return <Welcome/>;
                    }}/>
                    <PrivateRoute path="/projects" exact component={() => {
                        this.props.changeSelected('projects');
                        return <ProjectsPage />;
                    }} />
                    <PrivateRoute path="/projects/edit/:id" component={({ match }) => {
                        const { id } = match.params;
                        this.props.changeSelected('projects');
                        return <EditProject projectId={id} />
                    }} />
                    <PrivateRoute path="/projects/close/:id" component={({ match }) => {
                        const { id } = match.params;
                        this.props.changeSelected('projects');
                        return <CloseProject projectId={id} />
                    }} />
                    <PrivateRoute path="/employees" exact component={() => {
                        this.props.changeSelected('employees');
                        return <EmployeesPage />;
                    }} />
                    <PrivateRoute path="/employees/create" component={() => {
                        this.props.changeSelected('employees');
                        return <CreateEmployee />;
                    }} />
                    <PrivateRoute path="/transactions" component={() => {
                        this.props.changeSelected('transactions');
                        return <Transactions />;
                    }} />
                    <PrivateRoute path="/expenditures" component={() => {
                        this.props.changeSelected('expenditures');
                        return <Expenditures />;
                    }} />
                    <PrivateRoute path="/requests" component={() => {
                        this.props.changeSelected('requests');
                        return <Requests />;
                    }} />
                    <PrivateRoute path="/reports" component={() => {
                        this.props.changeSelected('reports');
                        return <Reports />;
                    }} />
                    <Route component={NotFound} />
                </Switch>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ commonInfo }) => {
    const { selected } = commonInfo;
    return { selected };
};

export default connect(mapStateToProps, {changeSelected})(Routes);

