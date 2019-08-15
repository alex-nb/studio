import React, { Component, Fragment } from 'react';
import {Form, Col, Button} from "react-bootstrap";
import {connect} from "react-redux";

import { fetchCompanyStructure } from "../../../actions/employees";
import { getCurrentProject } from '../../../actions/projects';

import Spinner from "../../layout/spinner";
import ErrorMessage from "../../layout/error-message";

import './edit-project.css';

/*
* TODO
*  загрузка выбранных сотрудников в process projects и информации по отделам
*  control form для checkbox и radio
*  save method
*
* */

class EditProject extends Component {

    state = {
        id: this.props.projectId,
        dateStart: '',
        dateEnd: '',
        fine: '0',
        premium: '0',
        employees: {},
        totalSum: '0'
    };

    componentDidMount() {
        this.props.fetchCompanyStructure();
        this.props.getCurrentProject(this.props.projectId);
    }

    componentDidUpdate(prevProps, prevState) {
        const { departmentOrder } = this.props;
        const { project, loadingProject } = this.props;
        if (project !== prevProps.project) {
            //console.log(project);
            this.setState({
                dateStart: loadingProject || !project.dateStart ? '' :  project.dateStart.split(".").reverse().join("-"),
                dateEnd: loadingProject || !project.deadline ? '' : project.deadline.split(".").reverse().join("-"),
                fine: loadingProject || !project.fine ? '0' :  project.fine,
                premium: loadingProject || !project.premium ? '0' : project.premium,
                totalSum: loadingProject || !project.costTotal ? '0' : project.costTotal
            });
        }
        if (departmentOrder !== prevProps.departmentOrder) {
            for (let i=0; i<departmentOrder.length; i++) {
                const deptId = departmentOrder[i];
                const costDept = `cost-${deptId}`;
                const hoursDept = `hours-${deptId}`;
                const rateDept = `rate-${deptId}`;
                this.setState(prevState => ({
                    employees: {...prevState.employees, [deptId]: [] },
                    [costDept]: '0',
                    [hoursDept]: '0',
                    [rateDept]: '0'
                }));
            }
        }
        /*if (Object.keys(this.state.employees).length > 0 && Object.keys(project).length > 0) {

        }*/
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onCheckboxChange = (e) => {
        const options = e.target.value;
        const name = e.target.name;

        if (e.target.type === "checkbox") {
            const value = (this.state.employees[name].indexOf(options) > -1) ?
                this.state.employees[name].filter(s => s !== options)
                : [...this.state.employees[name], options];

            this.setState( prevState => ({ employees:
                        {...prevState.employees, [name]: value }
                })
            );
        }
        else {
            this.setState( prevState => ({ employees:
                        {...prevState.employees, [name]: options }
                })
            );
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        console.log( this.state );
    };

    _chooseEmployee() {
        const { departmentOrder, departments, employees } = this.props;

        return departmentOrder.map((dept) => {
            const titleDept = departments[dept].title;
            const type = (dept !== "dept-6") ? (dept !== "dept-5") ? "checkbox" : "radio" : null;

            const employeesDept = (type && departments[dept].employeesIds) ? departments[dept].employeesIds.map((empId) => {
                return (
                    <Form.Check.Label type={type} className="employee-img" key={employees[empId].id}>
                        <Form.Check.Input
                            type={type} className="employee-img"
                            name={dept}
                            value={employees[empId].id}
                            onChange={this.onCheckboxChange}
                            //checked={ this.state.employees[dept].indexOf(employees[empId].id) > -1 }
                        />
                        <img alt={employees[empId].name} className="employee-img" src={employees[empId].img} title={employees[empId].name}/>
                    </Form.Check.Label>
                );
            }) : null;

            return (employeesDept) ? (
                <Fragment key={dept}>
                    <p className="title-dept">{titleDept}</p>
                    <Form.Row style={{paddingLeft: "25px", paddingTop: "0"}}>
                        <Form.Group as={Col} md="1">
                            <Form.Control
                                required type="number"
                                name={`rate-${dept}`}
                                value={this.state[`rate-${dept}`]}
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
                                value={this.state[`hours-${dept}`]}
                                onChange={this.onInputChange}
                                className="dept-input"
                            />
                            <Form.Text className="text-muted">
                                Часы на отдел
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} md="1">
                            <Form.Control
                                required type="number"
                                name={`cost-${dept}`}
                                value={this.state[`cost-${dept}`]}
                                onChange={this.onInputChange}
                                className="dept-input"
                            />
                            <Form.Text className="text-muted">
                                Сумма на отдел
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group style={{paddingLeft: "25px"}}>
                        <Form.Check inline type={type}>
                            {employeesDept}
                        </Form.Check>
                    </Form.Group>
                </Fragment>
            ) : null;
        })
    };

    render() {
        console.log(this.state);
        const {
            loadingEmployees, loadingDepartmentOrder, loadingDepartments, loadingAllEmployeesList,
            errorEmployees, errorDepartments, errorDepartmentOrder, errorAllEmployeesList
        } = this.props;

        if (loadingEmployees || loadingDepartmentOrder || loadingDepartments || loadingAllEmployeesList)
            return <div className="col-md-10 float-right"><Spinner/></div>;
        if (errorEmployees || errorDepartments || errorDepartmentOrder || errorAllEmployeesList)
            return <div className="col-md-10 float-right"><ErrorMessage/></div>;

        return (
            <div className="col-md-10 float-right">
                <Form onSubmit={this.onSubmit}>
                    <legend>Редактирование проекта </legend>
                    {this._chooseEmployee()}
                    <Form.Group>
                        <Form.Label>Общая сумма проекта</Form.Label>
                        <Form.Control
                            required type="number"
                            name="totalSum"
                            value={this.state.totalSum}
                            onChange={this.onInputChange}
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
                    <Button type="submit" variant="primary">Сохранить</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({ employeesList, projectsList }) => {
    const {
        departmentOrder, departments, employees, allEmployeesList,
        loadingEmployees, loadingDepartmentOrder, loadingDepartments, loadingAllEmployeesList,
        errorEmployees, errorDepartments, errorDepartmentOrder, onDelete, errorAllEmployeesList
    } = employeesList;
    const { project, loadingProject, errorProject } = projectsList;
    return {
        project, loadingProject, errorProject,
        departmentOrder, departments, employees, allEmployeesList,
        loadingEmployees, loadingDepartmentOrder, loadingDepartments, loadingAllEmployeesList,
        errorEmployees, errorDepartments, errorDepartmentOrder, onDelete, errorAllEmployeesList
    };
};

export default connect(mapStateToProps, { fetchCompanyStructure, getCurrentProject })(EditProject);