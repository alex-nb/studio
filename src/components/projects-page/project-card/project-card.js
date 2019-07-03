import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';

import './project-card.css';

import Report from '../report';
import Participant from './participant';
import ReportsHistory from '../reports-history';
import CloseProject from "../close-project";
import PeopleList from "../people-list";


class ProjectCard extends Component {
    state = {
        showModalReport: false,
        showModalReportsHistory: false,
        showModalCloseProject: false,
        showModalParticipant: false
    };

    changeStateModalReportsHistory = () => {
        this.setState({ showModalReportsHistory: !this.state.showModalReportsHistory })
    };

    changeStateModalReport = () => {
        this.setState({ showModalReport: !this.state.showModalReport });
    };

    changeStateModalCloseProject = () => {
        this.setState({ showModalCloseProject: !this.state.showModalCloseProject });
    };

    changeStateModalParticipant = () => {
        this.setState({ showModalParticipant: !this.state.showModalParticipant });
    };

    _departmentsInfo() {
        const { infoDepartments, participants } = this.props.project;
        if (!infoDepartments) return null;
        return infoDepartments.map((dept) => {
            const participantsList =  participants.filter(people => people.idDept===dept.idDept).map((people) => {
                return <PeopleList
                    key={people.idEmployee._id}
                    name={people.idEmployee.name}
                />;
            });
            return (
                <Fragment key={dept.idDept}>
                    {dept.nameDept} : {dept.cost}Y;
                    <br />
                    <strong>Часы: </strong> <span title="Фактические">{dept.hoursFact}h</span>/<span title="Планируемые">{dept.hoursPlan}h</span>
                    <br />
                    Участники: {participantsList}
                    <hr/>
                </Fragment>
            );
        });
    };

    _notNewProjectInfo() {
        return (
            <Fragment>
                <span className="pointer" onClick={() => this.changeStateModalParticipant()}>Участники проекта</span>
                <br />
                <span onClick={() => this.changeStateModalReportsHistory()} className="pointer">
                    Отчеты
                </span>
            </Fragment>
        );
    };

    _processProjectInfo() {
        return (
            <Fragment>
                <span onClick={() => this.changeStateModalCloseProject()}>
                    <i className="fas fa-check-circle fa-card pointer"/>
                </span>
                <span onClick={() => this.changeStateModalReport()}>
                    <i className="fas fa-plus-circle fa-card pointer"/>
                </span>
                <br />
            </Fragment>
        );
    };

    _notCloseProjectInfo() {
        const { _id } = this.props.project;
        return <Link to={`/projects/${_id}`}><i className="fas fa-edit fa-card pointer"/></Link>;
    };

    render() {
        const {
            costTotal, status,
            participants, reports, deadline,
            title, dateStart
        } = this.props.project;

        return(
            <div className="mini-card card bg-light mb-3">
                <div className="card-header">
                    {title}
                    <div>{dateStart} - {deadline}</div>
                </div>
                <div className="card-body">
                    <div className="card-text">
                        <strong>Стоимость:</strong> <span title="Общая стоимость">{costTotal} Y </span>
                        <hr/>
                        {status !== 'new' && this._notNewProjectInfo()}
                        {status !== 'close' && this._notCloseProjectInfo()}
                        {status === 'process' && this._processProjectInfo()}
                    </div>
                </div>
                <Report
                    show={this.state.showModalReport}
                    onHide={this.changeStateModalReport}
                />
                <ReportsHistory
                    show={this.state.showModalReportsHistory}
                    onHide={this.changeStateModalReportsHistory}
                    reports={reports}
                />
                <CloseProject
                    show={this.state.showModalCloseProject}
                    onHide={this.changeStateModalCloseProject}
                    participants={participants}
                    deadline={deadline}
                />
                <Participant
                    show={this.state.showModalParticipant}
                    onHide={this.changeStateModalParticipant}
                    departments={this._departmentsInfo()}
                />
            </div>
        );
    }
}

export default ProjectCard;