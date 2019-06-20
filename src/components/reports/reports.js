import React, { Component } from 'react';
import { ButtonGroup, Button, Collapse } from "react-bootstrap";
import { connect } from 'react-redux';
import {fetchAllReports} from '../../actions/reports';


import './reports.css';

import Spinner from "../spinner";
import ErrorMessage from "../error-message";


class Reports extends Component {

    state = {
        tabsProjects: {}
    };

    componentDidMount() {
        this.props.fetchAllReports();
    }

    render() {
        const {
            allReports, loadingAllReports, errorAllReports
        } = this.props;

        if (loadingAllReports) {
            return (<div className="col-md-10 float-right"><Spinner/></div>);
        }

        if (errorAllReports) {
            return (<div className="col-md-10 float-right"><ErrorMessage/></div>);
        }

        const tableBody = allReports.map((project) => {
            const newStateName = `tabProjects${project._id}`;
            const {tabsProjects} = this.state;

            return (
                <React.Fragment key={project._id}>
                    <tbody>
                        <tr
                            className="clickable"
                            aria-expanded={tabsProjects[newStateName]}
                            aria-controls={`group-of-rows-${project._id}`}
                            onClick={() => this.setState({ tabsProjects: {...tabsProjects, [newStateName]: !tabsProjects[newStateName] }})}
                        >
                            <td className="font-weight-bold">
                                <i className="fa fa-plus" aria-hidden="true"/>
                                {project.title}
                            </td>
                            <td/>
                            <td/>
                            <td>
                                {project.hoursFact}/{project.hoursPlan} ({project.hoursBad})
                            </td>
                            <td/>
                        </tr>
                    </tbody>
                    <Collapse in={tabsProjects[newStateName]}>
                        <tbody id={`group-of-rows-${project.id}`} className="collapse">
                        {project.reports.map((report) => {
                            const status = report.idReport.status ==='accepted' ?
                                <Button variant="success" disabled><i className="fas fa-check fa-actions"/></Button> :
                                report.idReport.status === 'rejected' ?
                                    <Button variant="danger" disabled><i className="fas fa-times fa-actions"/></Button> :
                                    report.idReport.status === 'neutral' ?
                                        <Button variant="primary" disabled><i className="fas fa-minus fa-actions"/></Button> :
                                        <ButtonGroup size="sm">
                                            <Button variant="success"><i className="fas fa-check fa-actions"/></Button>
                                            <Button variant="primary"><i className="fas fa-minus fa-actions"/></Button>
                                            <Button variant="danger"><i className="fas fa-times fa-actions"/></Button>
                                        </ButtonGroup>;
                            return (
                                <tr key={report.idReport._id}>
                                    <td>{report.idReport.date}</td>
                                    <td>{report.idEmployee.name}</td>
                                    <td>{report.idReport.report}</td>
                                    <td>{report.idReport.hours}</td>
                                    <td>
                                        {status}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Collapse>
                </React.Fragment>
            );
            });

        return(
            <div className="col-md-10 float-right">
                <table className="table table-hover table-sm">
                    <thead className="thead-dark">
                    <tr>
                        <th style={{width: "15%"}}>Дата</th>
                        <th style={{width: "15%"}}>Сотрудник</th>
                        <th style={{width: "40%"}}>Отчет</th>
                        <th style={{width: "15%"}}>Часы</th>
                        <th style={{width: "15%"}} />
                    </tr>
                    </thead>
                    {tableBody}
                </table>
            </div>
        );
    }
};

const mapStateToProps = ({ reportsList }) => {
    const { allReports, loadingAllReports, errorAllReports } = reportsList;
    return { allReports, loadingAllReports, errorAllReports };
};

export default connect(mapStateToProps, {fetchAllReports})(Reports);
