import React, { Component, Fragment } from 'react';
import {Form, Col, Button} from "react-bootstrap";
import {connect} from "react-redux";
import { withRouter} from "react-router-dom";

import { fetchCompanyStructure } from "../../../actions/employees";
import { getCurrentProject, updateProject } from '../../../actions/projects';

import Spinner from "../../layout/spinner";
import ErrorMessage from "../../layout/error-message";

import './edit-project.css';

import Can from "../../../utils/can";
import axios from "axios";


class EditProject extends Component {

    state = {
        id: this.props.projectId,
        dateStart: '',
        dateEnd: '',
        fine: 0,
        premium: 0,
        totalSum: 0,
        employees: {},
        cost: {},
        rate: {},
        hours: {},
        getDepartmentOrder: false
    };

    componentDidMount() {
        this.props.fetchCompanyStructure();
        this.props.getCurrentProject(this.props.projectId);
    }

    componentDidUpdate(prevProps, prevState) {

        const { departmentOrder } = this.props;
        const { project, loadingProject } = this.props;

        if (project !== prevProps.project) {
            this.setState({
                dateStart: loadingProject || !project.dateStart ? '' :  project.dateStart.split(".").reverse().join("-"),
                dateEnd: loadingProject || !project.deadline ? '' : project.deadline.split(".").reverse().join("-"),
                fine: loadingProject || !project.fine ? '0' :  project.fine,
                premium: loadingProject || !project.premium ? '0' : project.premium,
                totalSum: loadingProject || !project.costTotal ? '0' : project.costTotal
            });
        }

        if (Object.keys(departmentOrder).length !== 0
            && !this.state.getDepartmentOrder
            && Object.keys(project).length !== 0)
        {
            for (let i=0; i<departmentOrder.length; i++) {
                const deptId = departmentOrder[i];
                let infoDepartment = [];
                let participants = [];
                if (!loadingProject &&
                    project &&
                    project.infoDepartments &&
                    project.infoDepartments.length > 0) {
                    infoDepartment = project.infoDepartments.find(department => department.idDept === deptId);
                }
                if (!loadingProject &&
                    project &&
                    project.participants &&
                    project.participants.length > 0) {
                    participants = project.participants.filter(participant => participant.idDept === deptId);
                }
                this.setState(prevState => ({
                    employees: {...prevState.employees, [deptId]: participants.length > 0 ?
                            participants.map(participant => {
                                return {[participant.idEmployee._id]: participant.revenue ? participant.revenue : 0};
                            })
                            : [] },
                    cost: {...prevState.cost, [deptId]: infoDepartment && infoDepartment.cost ? infoDepartment.cost :'0'},
                    hours: {...prevState.hours,[deptId]: infoDepartment && infoDepartment.hoursPlan ? infoDepartment.hoursPlan :'0'},
                    rate: {...prevState.rate,[deptId]: infoDepartment && infoDepartment.rate ? infoDepartment.rate :'0'},
                    getDepartmentOrder: true
                }));
            }
        }

        if (prevState.cost !== this.state.cost) {
            let totalSum = 0;
            for (let costDept in this.state.cost) {
                totalSum+= Number(this.state.cost[costDept]);
            }
            this.setState({
                totalSum: totalSum
            });
        }
    }

    onInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        const deptId = name.split("-")[1];
        if (name.indexOf('hours') > -1) {
            this.setState(prevState => ({
                hours: {
                    ...prevState.hours,
                    [deptId]: value
                },
                cost: {
                    ...prevState.cost,
                    [deptId]: value*this.state.rate[deptId]
                }
            }));
            return;
        }
        if (name.indexOf('rate') > -1) {
            this.setState(prevState => ({
                rate: {
                    ...prevState.rate,
                    [deptId]: value
                },
                cost: {
                    ...prevState.cost,
                    [deptId]: value*this.state.hours[deptId]
                }
            }));
            return;
        }
        this.setState({
            [name]: value
        });
    };

    onCheckboxChange = (e) => {
        const idEmp = e.target.value;
        const idDept = e.target.name;
        let employeesState = this.state.employees[idDept];
        if (e.target.type === "checkbox") {
            const employee = employeesState.find(employees => idEmp in employees);
            if (!employee) employeesState.push({[idEmp]: 0});
            else employeesState.splice(employeesState.indexOf(employee), 1);
            this.setState( prevState => ({ employees:
                        {...prevState.employees, [idDept]: employeesState }
                })
            );
        }
        else {
            this.setState( prevState => ({ employees:
                        {...prevState.employees, [idDept]: [{[idEmp]: 0}] }
                })
            );
        }
    };

    changeRevenue = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        const idDept = name.split("-")[0];
        const idEmp = name.split("-")[1];
        let employeesState = this.state.employees[idDept];
        const employee = employeesState.find(employees => idEmp in employees);
        employeesState[employeesState.indexOf(employee)][idEmp] = value;
        this.setState( prevState => ({
            employees: {
                ...prevState.employees,
                [idDept]: employeesState
                }
            })
        );
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.updateProject (this.state, this.props.history);
    };

    _chooseEmployee() {
        const { departmentOrder, departments, employees } = this.props;

        return departmentOrder.map((dept) => {
            const titleDept = departments[dept].title;
            const type = (titleDept === "Studio" || titleDept === "Project management") ? "radio" : "checkbox";

            const employeesDept = (type && departments[dept].employeesIds) ? departments[dept].employeesIds.map((empId) => {
                const employeesInState = this.state.employees[dept] ?
                    this.state.employees[dept].find(employee => employees[empId].idBase in employee)
                    : [];
                const revenue = employeesInState && employeesInState[employees[empId].idBase] ? employeesInState[employees[empId].idBase] : 0;
                return (
                    <Form.Row key={employees[empId].id}>
                        <Form.Group as={Col} md="1">
                            <Form.Check.Label type={type} className="employee-img">
                                <Form.Check.Input
                                    type={type} className="employee-img"
                                    name={dept}
                                    value={employees[empId].idBase}
                                    onChange={this.onCheckboxChange}
                                    checked={!!employeesInState}
                                />
                                <img alt={employees[empId].name} className="employee-img" src={axios.defaults.baseURL+employees[empId].img} title={employees[empId].name}/>
                            </Form.Check.Label>
                            <Form.Text className="text-muted">
                                {employees[empId].name}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Form.Control
                                type="number"
                                disabled={!employeesInState}
                                name={`${dept}-${employees[empId].idBase}`}
                                value={revenue}
                                onChange={this.changeRevenue}
                            />
                        </Form.Group>
                    </Form.Row>
                );
            }) : null;

            return (employeesDept) ? (
                <Fragment key={dept}>
                    <Form.Row style={{paddingLeft: "25px", paddingTop: "0"}}>
                        <Form.Text className="title-dept">
                            {titleDept}
                        </Form.Text>
                        <Form.Group as={Col} md="1">
                            <Form.Control
                                required type="number"
                                name={`rate-${dept}`}
                                value={this.state.rate[dept]}
                                onChange={this.onInputChange}
                                className="dept-input"
                            />
                            <Form.Text className="text-muted">
                                Ставка отдела
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} md="1">
                            <Form.Control
                                required type="number"
                                name={`hours-${dept}`}
                                value={this.state.hours[dept]}
                                onChange={this.onInputChange}
                                className="dept-input"
                            />
                            <Form.Text className="text-muted">
                                Часы на отдел
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} md="1">
                            <Form.Control
                                required readOnly
                                type="number"
                                name={`cost-${dept}`}
                                value={this.state.cost[dept]}
                                className="dept-input cost"
                            />
                            <Form.Text className="text-muted">
                                Сумма на отдел
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group style={{paddingLeft: "25px"}}>
                        <Form.Check type={type}>
                            {employeesDept}
                        </Form.Check>
                    </Form.Group>
                    <hr/>
                </Fragment>
            ) : null;
        })
    };

    render() {
        const {
            loadingEmployees, loadingDepartmentOrder, loadingDepartments, loadingAllEmployeesList, loadingProject,
            errorEmployees, errorDepartments, errorDepartmentOrder, errorAllEmployeesList, errorProject
        } = this.props;

        if (loadingEmployees || loadingDepartmentOrder || loadingDepartments || loadingAllEmployeesList || loadingProject)
            return <div className="col-md-10 float-right"><Spinner/></div>;
        if (errorEmployees || errorDepartments || errorDepartmentOrder || errorAllEmployeesList || errorProject)
            return <div className="col-md-10 float-right"><ErrorMessage/></div>;

        return (
            <Can
                roles={this.props.roles}
                perform="projects:edit"
                yes={() => (
                    <div className="col-md-10 float-right">
                        <Form onSubmit={this.onSubmit}>
                            <legend>Редактирование проекта «{this.props.project.title}» </legend>
                            {this._chooseEmployee()}
                            <Form.Group>
                                <Form.Label>Общая сумма проекта</Form.Label>
                                <Form.Control
                                    readOnly required
                                    type="number"
                                    name="totalSum"
                                    value={this.state.totalSum}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Дата начала</Form.Label>
                                <Form.Control
                                    required type="date"
                                    name="dateStart"
                                    value={this.state.dateStart}
                                    onChange={this.onInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Дата дедлайна</Form.Label>
                                <Form.Control
                                    required type="date"
                                    name="dateEnd"
                                    value={this.state.dateEnd}
                                    onChange={this.onInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Премия (на 1 день досрочной сдачи)</Form.Label>
                                <Form.Control
                                    required type="number"
                                    name="premium"
                                    value={this.state.premium}
                                    onChange={this.onInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Штраф (на 1 день срыва срока)</Form.Label>
                                <Form.Control
                                    required type="number"
                                    name="fine"
                                    value={this.state.fine}
                                    onChange={this.onInputChange}
                                />
                            </Form.Group>
                            <Button type="submit"  variant="primary"
                                    disabled={this.props.loadingUpdateProject}>
                                {this.props.loadingUpdateProject ? 'Секунду...' : 'Сохранить'}
                            </Button>
                        </Form>
                    </div>
                )}
                no={() => (<div className="col-md-10 float-right"><h3>Извините, доступ запрещен.</h3></div>)}
            />

        );
    }
}

const mapStateToProps = ({ employeesList, projectsList, auth }) => {
    const {
        departmentOrder, departments, employees, allEmployeesList,
        loadingEmployees, loadingDepartmentOrder, loadingDepartments, loadingAllEmployeesList,
        errorEmployees, errorDepartments, errorDepartmentOrder, onDelete, errorAllEmployeesList
    } = employeesList;
    const { project, loadingProject, errorProject, loadingUpdateProject } = projectsList;
    const { roles } = auth;
    return {
        project, loadingProject, errorProject, roles, loadingUpdateProject,
        departmentOrder, departments, employees, allEmployeesList,
        loadingEmployees, loadingDepartmentOrder, loadingDepartments, loadingAllEmployeesList,
        errorEmployees, errorDepartments, errorDepartmentOrder, onDelete, errorAllEmployeesList
    };
};

export default connect(mapStateToProps, { fetchCompanyStructure, getCurrentProject, updateProject })(withRouter(EditProject));