import React, {Component} from 'react';
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import { fetchCompanyStructure, updateDepartments } from "../../../actions/employees";
import {connect} from "react-redux";
import Spinner from "../../layout/spinner";
import ErrorMessage from "../../layout/error-message";
import InnerListDepartment from "../department-list";


class DragDropList extends Component {

    state = {
        employees: {},
        departments: {},
        departmentOrder: [],
        allEmployeesList: []
    };

    componentDidMount() {
        this.props.fetchCompanyStructure();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.employees !== this.props.employees)
            this.setState({employees: this.props.employees});
        if (prevProps.departments !== this.props.departments)
            this.setState({departments: this.props.departments});
        if (prevProps.departmentOrder !== this.props.departmentOrder)
            this.setState({departmentOrder: this.props.departmentOrder});
        if (prevProps.allEmployeesList !== this.props.allEmployeesList)
            this.setState({allEmployeesList: this.props.allEmployeesList});
    }

    onDragEnd = result => {
        const { destination, source, draggableId, type } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        if(type === 'department') {
            const newDepartmentOrder = Array.from(this.state.departmentOrder);
            newDepartmentOrder.splice(source.index, 1);
            newDepartmentOrder.splice(destination.index, 0, draggableId);
//---------------------------------------------------------------------------------------------------------ИЗМЕНЕНИЕ ПОРЯДКА ОТДЕЛОВ
            const newState = {
              ...this.state,
              departmentOrder: newDepartmentOrder
            };

            this.setState(newState);
            return;
        }

        const start = this.state.departments[source.droppableId];
        const finish = this.state.departments[destination.droppableId];

        if (start === finish) {
            const newEmployeesIds = Array.from(start.employeesIds);
            newEmployeesIds.splice(source.index, 1);
            newEmployeesIds.splice(destination.index, 0, draggableId);

            const newDept = {
                ...start,
                employeesIds: newEmployeesIds,
            };

            const newState = {
                ...this.state,
                departments: {
                    ...this.state.departments,
                    [newDept.id]: newDept,
                }
            };

            this.setState(newState);
            return;
        }

        const startEmployeesIds = Array.from(start.employeesIds);
        startEmployeesIds.splice(source.index, 1);
        const newStart = {
            ...start,
            employeesIds: startEmployeesIds
        };

        const idBaseStart = startEmployeesIds.map((employeeId) => this.state.employees[employeeId].idBase);

        const finishEmployeesIds = Array.from(finish.employeesIds);
        const draggableIdBase = this.state.employees[draggableId].idBase;
        const existEmployeeId = finishEmployeesIds.filter((employeeId) => this.state.employees[employeeId].idBase===draggableIdBase);

        if (existEmployeeId.length === 0) finishEmployeesIds.splice(destination.index, 0, draggableId);

        const newFinish ={
            ...finish,
            employeesIds: finishEmployeesIds
        };
        const idBaseFinish = finishEmployeesIds.map((employeeId) => this.state.employees[employeeId].idBase);

        this.props.updateDepartments([{deptId: newStart.id, employees: idBaseStart}, {deptId: newFinish.id, employees: idBaseFinish}]);

        const newState = {
            ...this.state,
            departments: {
                ...this.state.departments,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };

        this.setState(newState);
    };

    render () {
        const {
            loadingEmployees, loadingDepartmentOrder, loadingDepartments, loadingAllEmployeesList,
            errorEmployees, errorDepartments, errorDepartmentOrder, errorAllEmployeesList
        } = this.props;

        if (loadingEmployees || loadingDepartmentOrder || loadingDepartments || loadingAllEmployeesList) {
            return (<div className="col-md-10 float-right"><Spinner/></div>);
        }

        if (errorEmployees || errorDepartments || errorDepartmentOrder || errorAllEmployeesList) {
            return (<div className="col-md-10 float-right"><ErrorMessage/></div>);
        }

        const {
            departmentOrder, departments, employees, allEmployeesList
        } = this.state;

        console.log(departments, employees, allEmployeesList);

        return (
            <div className="col-md-10 float-right">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="all-departments" type="department">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {departmentOrder.map((deptId, index) => {
                                    const dept = departments[deptId];
                                    return (<InnerListDepartment
                                        key={dept.id}
                                        dept={dept}
                                        employeeMap={employees}
                                        index={index}
                                        allEmployees = {allEmployeesList}
                                    />);
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    };
}

const mapStateToProps = ({ employeesList }) => {
    const {
        departmentOrder, departments, employees, allEmployeesList,
        loadingEmployees, loadingDepartmentOrder, loadingDepartments, loadingAllEmployeesList,
        errorEmployees, errorDepartments, errorDepartmentOrder, onDelete, errorAllEmployeesList
    } = employeesList;
    return {
        departmentOrder, departments, employees, allEmployeesList,
        loadingEmployees, loadingDepartmentOrder, loadingDepartments, loadingAllEmployeesList,
        errorEmployees, errorDepartments, errorDepartmentOrder, onDelete, errorAllEmployeesList
    };
};

export default connect(mapStateToProps, {fetchCompanyStructure, updateDepartments})(DragDropList);