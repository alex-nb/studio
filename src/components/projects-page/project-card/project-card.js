import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { startProject } from '../../../actions/projects';
import { connect } from 'react-redux';
import './project-card.css';
import Report from '../report';
import Participant from './participant';
import ReportsHistory from '../reports-history';
import PeopleList from "../people-list";
import Can from "../../../utils/can";


class ProjectCard extends Component {
    state = {
        showModalReport: false,
        showModalReportsHistory: false,
        showModalParticipant: false,
        idProject: ''
    };

    changeStateModalReportsHistory = () => {
        this.setState({ showModalReportsHistory: !this.state.showModalReportsHistory })
    };

    changeStateModalReport = () => {
        this.setState({ showModalReport: !this.state.showModalReport });
    };

    showModalReport = (id) => {
        this.setState({
            idProject: id,
            showModalReport: true
        });
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
                    key={`${people.idEmployee._id}-${dept.idDept}`}
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

    _newProjectInfo() {
        const { _id } = this.props.project;
        return (
            <Fragment>
                <Can
                    roles={this.props.roles}
                    perform="projects:start"
                    yes={() => (<span className="pointer" onClick={() => {
                        if(window.confirm("Перевести проект в статус 'Текущие'?")) {
                            this.props.startProject(_id);
                        }

                    }}>
                <i className="fas fa-play-circle fa-card pointer"/>
            </span>)}
                    no={() => null}
                />
                <Can
                    roles={this.props.roles}
                    perform="projects:edit:new"
                    yes={() => (<Link to={`/projects/edit/${_id}`}><i className="fas fa-edit fa-card pointer"/></Link>)}
                    no={() => null}
                />
            </Fragment>

        );
    };

    _notNewProjectInfo() {
        return (
            <Fragment>
                <span className="pointer" onClick={() => this.changeStateModalParticipant()}>Участники проекта</span>
                <br />
                <span onClick={() => this.changeStateModalReportsHistory()} className="pointer">
                    Отчеты
                </span>
                <br />
            </Fragment>
        );
    };

    _processProjectInfo() {
        const { _id } = this.props.project;
        return (
            <Fragment>
                <Can
                    roles={this.props.roles}
                    perform="projects:close"
                    yes={() => (<Link to={`/projects/close/${_id}`}><i className="fas fa-check-circle fa-card pointer"/></Link>)}
                    no={() => null}
                />
                <Can
                    roles={this.props.roles}
                    perform="projects:edit:process"
                    yes={() => (<Link to={`/projects/edit/${_id}`}><i className="fas fa-edit fa-card pointer"/></Link>)}
                    no={() => null}
                />
                <span onClick={() => this.showModalReport(_id)}>
                    <i className="fas fa-plus-circle fa-card pointer"/>
                </span>
            </Fragment>
        );
    };

    render() {
        const {
            costTotal, status,
            reports, deadline,
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
                        {status === 'new' && this._newProjectInfo()}
                        {status === 'process' && this._processProjectInfo()}
                    </div>
                </div>
                <Report
                    show={this.state.showModalReport}
                    onHide={this.changeStateModalReport}
                    id_project={this.state.idProject}
                />
                <ReportsHistory
                    show={this.state.showModalReportsHistory}
                    onHide={this.changeStateModalReportsHistory}
                    reports={reports}
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

const mapStateToProps = ({ auth }) => {
    const { roles } = auth;
    return { roles };
};
export default connect(mapStateToProps, {startProject})(ProjectCard);