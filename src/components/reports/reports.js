import React, { Component } from 'react';
import { ButtonGroup, Button, Collapse, Form, Table, Row,Col } from "react-bootstrap";
import { connect } from 'react-redux';
import {fetchAllReports} from '../../actions/reports';
import RejectedReport from "./rejected-report";

import './reports.css';

import Spinner from "../layout/spinner";
import ErrorMessage from "../layout/error-message";


class Reports extends Component {

    state = {
        tabsProjects: {},
        grouping: "project",
        dates: "",
        showModalReject: false,
        idReport: ''
    };

    componentDidMount() {
        this.props.fetchAllReports();
    }

    changeStateModalReject = () => {
        this.setState({ showModalReject: !this.state.showModalReject })
    };

    showModalReject = (id) => {
        this.setState({
            idReport: id,
            showModalReject: true
        });
    };

    onChangeTypeGrouping = (e) => {
        this.setState({
            grouping: e.target.value
        });
    };

    _tableBodyProject() {
        return this.props.allReports.map((project) => {
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
                        <td/>
                        <td title="план./факт. (не принятые)">
                            {project.hoursFact}/{project.hoursPlan} ({project.hoursBad ? project.hoursBad : 0})
                        </td>
                        <td/>
                    </tr>
                    </tbody>
                    <Collapse in={tabsProjects[newStateName]}>
                        <tbody id={`group-of-rows-${project._id}`} className="collapse">
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
                                            <Button variant="danger"  onClick={() => this.showModalReject(report.idReport._id)}>
                                                <i className="fas fa-times fa-actions"/>
                                            </Button>
                                        </ButtonGroup>;
                            return (
                                <tr key={report.idReport._id}>
                                    <td>{report.idReport.date}</td>
                                    <td>{report.idEmployee.name}</td>
                                    <td>{report.idReport.report}</td>
                                    <td>{report.idReport.reason ? report.idReport.reason : ""}</td>
                                    <td>
                                        {report.idReport.hoursWork ? `Работа: ${report.idReport.hoursWork}` : ""}
                                        <br/>
                                        {report.idReport.acceptedHoursWork ? `(принято: ${report.idReport.acceptedHoursWork})` : ""}
                                        <br/>
                                        {report.idReport.hoursStudy ? `Обучение: ${report.idReport.hoursStudy}` : ""}
                                        <br/>
                                        {report.idReport.acceptedHoursStudy ? `(принято: ${report.idReport.acceptedHoursStudy})` : ""}
                                    </td>
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
        })
    }

    _tableBodyEmployee() {
        let reports = [];
        let tableBody = [];

        this.props.allReports.forEach((project) => {
            project.reports.forEach((report) => {
                reports[report.idEmployee._id] =
                    reports[report.idEmployee._id] ?
                        reports[report.idEmployee._id] :
                        {
                            name: report.idEmployee.name,
                            _id: report.idEmployee._id,
                            allHoursWork: 0,
                            allAcceptedHoursWork: 0,
                            allHoursStudy: 0,
                            allAcceptedHoursStudy: 0
                        };
                reports[report.idEmployee._id].reports =
                    reports[report.idEmployee._id].reports ?
                        reports[report.idEmployee._id].reports :
                        [];

                reports[report.idEmployee._id].allHoursWork = report.idReport.hoursWork ?
                    reports[report.idEmployee._id].allHoursWork+Number(report.idReport.hoursWork)
                    : reports[report.idEmployee._id].allHoursWork;
                reports[report.idEmployee._id].allAcceptedHoursWork = report.idReport.allAcceptedHoursWork ?
                    reports[report.idEmployee._id].allAcceptedHoursWork+Number(report.idReport.allAcceptedHoursWork)
                    : reports[report.idEmployee._id].allAcceptedHoursWork;
                reports[report.idEmployee._id].allHoursStudy = report.idReport.allHoursStudy ?
                    reports[report.idEmployee._id].allHoursStudy+Number(report.idReport.allHoursStudy)
                    : reports[report.idEmployee._id].allHoursStudy;
                reports[report.idEmployee._id].allAcceptedHoursStudy = report.idReport.allAcceptedHoursStudy ?
                    reports[report.idEmployee._id].allAcceptedHoursStudy+Number(report.idReport.allAcceptedHoursStudy)
                    : reports[report.idEmployee._id].allAcceptedHoursStudy;

                reports[report.idEmployee._id].reports.push({
                    idReport: {
                        _id: report.idReport._id,
                        date: report.idReport.date,
                        report: report.idReport.report,
                        reason: report.idReport.reason,
                        hoursWork: report.idReport.hoursWork,
                        acceptedHoursWork: report.idReport.acceptedHoursWork,
                        hoursStudy: report.idReport.hoursStudy,
                        acceptedHoursStudy: report.idReport.acceptedHoursStudy,
                        status: report.idReport.status,
                    },
                    idProject: {
                        _id: project._id,
                        hoursFact: project.hoursFact,
                        hoursPlan: project.hoursPlan,
                        title: project.title,
                    }
                });
            });

        });

        for (let employee in reports) {
            const newStateName = `tabProjects${reports[employee]._id}`;
            const {tabsProjects} = this.state;
            tableBody.push(
            <React.Fragment key={reports[employee]._id}>
                <tbody>
                <tr
                    className="clickable"
                    aria-expanded={tabsProjects[newStateName]}
                    aria-controls={`group-of-rows-${reports[employee]._id}`}
                    onClick={() => this.setState({ tabsProjects: {...tabsProjects, [newStateName]: !tabsProjects[newStateName] }})}
                >
                    <td className="font-weight-bold">
                        <i className="fa fa-plus" aria-hidden="true"/>
                        {reports[employee].name}
                    </td>
                    <td/>
                    <td/>
                    <td/>
                    <td title="факт.ч. (принятые) ">
                        Работа: {reports[employee].allHoursWork} ({reports[employee].allAcceptedHoursWork})
                        <br/>
                        Обучение: {reports[employee].allHoursStudy} ({reports[employee].allAcceptedHoursStudy})
                    </td>
                    <td/>
                </tr>
                </tbody>
                <Collapse in={tabsProjects[newStateName]}>
                    <tbody id={`group-of-rows-${reports[employee]._id}`} className="collapse">
                    {reports[employee].reports.map((report) => {
                        const status = report.idReport.status ==='accepted' ?
                            <Button variant="success" disabled><i className="fas fa-check fa-actions"/></Button> :
                            report.idReport.status === 'rejected' ?
                                <Button variant="danger" disabled><i className="fas fa-times fa-actions"/></Button> :
                                report.idReport.status === 'neutral' ?
                                    <Button variant="primary" disabled><i className="fas fa-minus fa-actions"/></Button> :
                                    <ButtonGroup size="sm">
                                        <Button variant="success"><i className="fas fa-check fa-actions"/></Button>
                                        <Button variant="primary"><i className="fas fa-minus fa-actions"/></Button>
                                        <Button variant="danger" onClick={() => this.showModalReject(report.idReport._id)}>
                                            <i className="fas fa-times fa-actions"/>
                                        </Button>
                                    </ButtonGroup>;
                        return (
                            <tr key={report.idReport._id}>
                                <td>{report.idReport.date}</td>
                                <td>{report.idProject.title}</td>
                                <td>{report.idReport.report}</td>
                                <td>{report.idReport.reason ? report.idReport.reason : ""}</td>
                                <td>
                                    {report.idReport.hoursWork ? `Работа: ${report.idReport.hoursWork}` : ""}
                                    <br/>
                                    {report.idReport.acceptedHoursWork ? `(принято: ${report.idReport.acceptedHoursWork})` : ""}
                                    <br/>
                                    {report.idReport.hoursStudy ? `Обучение: ${report.idReport.hoursStudy}` : ""}
                                    <br/>
                                    {report.idReport.acceptedHoursStudy ? `(принято: ${report.idReport.acceptedHoursStudy})` : ""}
                                </td>
                                <td>
                                    {status}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Collapse>
            </React.Fragment>);
        }
        return tableBody;
    }

    render() {
        const { loadingAllReports, errorAllReports } = this.props;

        if (loadingAllReports) return (<div className="col-md-10 float-right"><Spinner/></div>);
        if (errorAllReports) return (<div className="col-md-10 float-right"><ErrorMessage/></div>);

        return(
            <div className="col-md-10 float-right">
                <Form.Group as={Row}>
                    <Form.Label column sm="2" className="text">Группировка</Form.Label>
                    <Col sm="3">
                        <Form.Control as="select" onChange={this.onChangeTypeGrouping}>
                            <option value="project">по проекту</option>
                            <option value="employee">по сотруднику</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Table bordered hover size="sm">
                    <thead className="thead-dark">
                    <tr>
                        <th style={{width: "15%"}}>Дата</th>
                        <th style={{width: "15%"}}>{this.state.grouping === "project" ? "Сотрудник" : "Проект"}</th>
                        <th style={{width: "20%"}}>Отчет</th>
                        <th style={{width: "20%"}}>Комментарий</th>
                        <th style={{width: "15%"}}>Часы</th>
                        <th style={{width: "5%"}} />
                    </tr>
                    </thead>
                    {this.state.grouping === "project" ? this._tableBodyProject() : this._tableBodyEmployee()}
                </Table>
                <RejectedReport
                    show={this.state.showModalReject}
                    onHide={this.changeStateModalReject}
                    id_report={this.state.idReport}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ reportsList }) => {
    const { allReports, loadingAllReports, errorAllReports } = reportsList;
    return { allReports, loadingAllReports, errorAllReports };
};

export default connect(mapStateToProps, {fetchAllReports})(Reports);
