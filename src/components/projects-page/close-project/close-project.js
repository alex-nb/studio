import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import moment from "moment";
import {withRouter} from "react-router-dom";
import {Form,Button, Row, Col} from "react-bootstrap";
import { getCurrentProject, closeProject } from '../../../actions/projects';
import Spinner from "../../layout/spinner";
import ErrorMessage from "../../layout/error-message";

import './close-project.css';

class CloseProject extends Component {

    state = {
        summ: {},
        id: this.props.projectId,
        dateEnd: moment().format("DD.MM.YYYY")
    };

    componentDidMount() {
        this.props.getCurrentProject(this.props.projectId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(Object.keys(this.state.summ).length === 0 && this.props.project.participants) {
            const participants = this.props.project.participants;
            if(participants.length > 0) {
                participants.forEach((people) => {
                    this.setState(prevState => ({
                        summ: {...prevState.summ, [people._id]: {
                                premium: 0,
                                fine: 0,
                                idDept: people.idDept
                            }
                        },
                    }));
                });
            }
        }
    }

    onInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        let type = name.split("-")[0];
        let employeeId = name.split("-")[1];
        this.setState( prevState => ({ summ:
                    {...prevState.summ, [employeeId] : {
                            ...prevState.summ[employeeId],
                            [type] : value
                        }
                    }
            })
        );
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.closeProject(this.state, this.props.history);
    };

    difference = (dateStr) => {
        if (!dateStr) return {text: "Дата дедлайна не определена"};
        const {premium, fine} = this.props.project;
        const dateStart = moment(dateStr, "DD.MM.YYYY");
        const dateEnd = moment();
        const diff = dateEnd.diff(dateStart, 'days');
        if (diff<0) return {text: `Проект завершен раньше на ${Math.abs(diff)} ${this.num2str(Math.abs(diff))}`, diff: Math.abs(diff), premium: premium ? Math.abs(diff)*Number(premium) : 0};
        if (diff===0) return {text: "Проект завершен вовремя"};
        if (diff>0) return {text: `Проект завершен позже на ${diff} ${this.num2str(diff)}`, diff: diff, fine: fine ? diff*Number(fine) : 0};
    };

    num2str = (n) => {
        const text_forms = ['день', 'дня', 'дней'];
        n = Math.abs(n) % 100;
        let n1 = n % 10;
        if (n > 10 && n < 20) return text_forms[2];
        if (n1 > 1 && n1 < 5) return text_forms[1];
        if (n1 === 1) return text_forms[0];
        return text_forms[2];
    };

    _participantsList() {
        const {participants} = this.props.project;
        if (participants && Object.keys(this.state.summ).length !== 0) {
            return participants.map((people) => {
                return (
                    <Fragment key={people._id}>
                        <small className="dept"> {people.nameDept} </small>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                <img alt={people.idEmployee.name}
                                     className="employee-img"
                                     src={people.idEmployee.img}
                                     title={people.idEmployee.name}/>
                                <Form.Text className="text-muted">
                                    {people.revenue} Y
                                </Form.Text>
                            </Form.Label>
                            <Col sm="5">
                                <Form.Control
                                    required type="number"
                                    name={`premium-${people._id}`}
                                    value={this.state.summ[people._id].premium}
                                    onChange={this.onInputChange}
                                />
                                <Form.Text className="text-muted">
                                    Премия
                                </Form.Text>
                            </Col>
                            <Col sm="5">
                                <Form.Control
                                    required type="number"
                                    name={`fine-${people._id}`}
                                    value={this.state.summ[people._id].fine}
                                    onChange={this.onInputChange}
                                />
                                <Form.Text className="text-muted">
                                    Штраф
                                </Form.Text>
                            </Col>
                        </Form.Group>
                    </Fragment>
                );
            });
        }
        return null;
    };

    render() {
        const { project, loadingProject, errorProject } = this.props;
        if (loadingProject) return <div className="col-md-10 float-right"><Spinner/></div>;
        if (errorProject) return <div className="col-md-10 float-right"><ErrorMessage/></div>;

        const difference = this.difference(project.deadline);
        return (
            <div className="col-md-10 float-right">
                <Form onSubmit={this.onSubmit}>
                    <legend>Завершение проекта «{project.title}» </legend>
                    <p>Дедлайн: <b className="font-weight-bold">{project.deadline}</b></p>
                    <p>Общая стоимость проекта: <b className="font-weight-bold">{project.costTotal}</b></p>
                    <p>Назначенная сумма штрафа: <b className="font-weight-bold">{project.fine}</b></p>
                    <p>Назначенная сумма премии: <b className="font-weight-bold">{project.premium}</b></p>
                    <p className="font-weight-bold">{difference.text}</p>
                    {difference.premium ? <p>Сумма премии: <b className="font-weight-bold">{difference.premium}</b></p> : null}
                    {difference.fine ?  <p>Сумма штрафа: <b className="font-weight-bold">{difference.fine}</b></p> : null}
                    {this._participantsList()}
                    <Button type="submit" variant="primary">Сохранить</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({projectsList }) => {
    const { project, loadingProject, errorProject } = projectsList;
    return {
        project, loadingProject, errorProject
    };
};

export default connect(mapStateToProps, { getCurrentProject, closeProject })(withRouter(CloseProject));