import React, {Component, Fragment} from 'react';
import Report from '../report';

import Participant from './participant';
import ReportsHistory from '../reports-history';

import './project-card.css';
import CloseProject from "../close-project";
import PeopleList from "../people-list";


class ProjectCard extends Component {
    state = {
        modalShowReport: false,
        modalShowReportsHistory: false,
        modalCloseProject: false,
        modalShowParticipant: false
    };

    render() {
        const { editProject } = this.props;
        const {
            title, costTotal, infoDepartments, status,
            participants, reports,
            dateStart, deadline, _id
        } = this.props.project;

        const modalReportsHistory = () => this.setState({ modalShowReportsHistory: false });
        const modalReport = () => this.setState({ modalShowReport: false });
        const modalCloseProject = () => this.setState({ modalCloseProject: false });
        const modalParticipant = () => this.setState({ modalShowParticipant: false });

        const departments = infoDepartments ? infoDepartments.map((dept) => {
            const participantsArray = participants.filter(people => people.idDept===dept.idDept);
            const participantsList = participantsArray.map((people) => {
                return (
                    <PeopleList
                        key={people.idEmployee}
                        name={people.nameEmployee}
                    />
                );
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
        }) : null;

        return(
            <div className="mini-card card bg-light mb-3">
                <div className="card-header">
                    {title}
                    {dateStart || deadline ?
                        (<div>{dateStart} - {deadline}</div>)
                        : null}
                </div>
                <div className="card-body">
                    <div className="card-text">
                        <strong>Стоимость:</strong> <span title="Общая стоимость">{costTotal} Y </span>
                        <hr/>
                        {status !== 'new' ?
                            (<Fragment>
                                <span className="pointer" onClick={() => this.setState({ modalShowParticipant: true })}>Участники проекта</span>
                                <br />
                                <span onClick={() => this.setState({ modalShowReportsHistory: true })} className="pointer">
                                            Отчеты
                                </span>
                            </Fragment>) : null}
                        {status !== 'close' ?
                            (<Fragment>
                                <br />
                                <span onClick={() => editProject(_id)}>
                                    <i className="fas fa-edit fa-card pointer"/>
                                </span>
                            </Fragment>) : null}
                        {status === 'process' ?
                            (<Fragment>
                                <span onClick={() => this.setState({ modalCloseProject: true })}>
                                            <i className="fas fa-check-circle fa-card pointer"/>
                                </span>
                                <span onClick={() => this.setState({ modalShowReport: true })}>
                                            <i className="fas fa-plus-circle fa-card pointer"/>
                                </span>
                                <br />
                            </Fragment>) : null}
                    </div>
                </div>
                <Report
                    show={this.state.modalShowReport}
                    onHide={modalReport}
                />
                <ReportsHistory
                    show={this.state.modalShowReportsHistory}
                    onHide={modalReportsHistory}
                    reports={reports}
                />
                <CloseProject
                    show={this.state.modalCloseProject}
                    onHide={modalCloseProject}
                    participants={participants}
                    deadline={deadline}
                />
                <Participant
                    show={this.state.modalShowParticipant}
                    onHide={modalParticipant}
                    departments={departments}
                />
            </div>
        );
    }
}

export default ProjectCard;