import React, {Component} from 'react';
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import InnerListDepartment from "../department-list";


export default class DragDropList extends Component {

    state = {
        departmentOrder: this.props.departmentOrder,
        departments: this.props.departments,
        employees: this.props.employees,
        onDelete: this.props.onDelete,
        allEmployees: this.props.allEmployees
    };

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

        const finishEmployeesIds = Array.from(finish.employeesIds);
        const draggableIdBase = this.state.employees[draggableId].idBase;
        const existEmployeeId = finishEmployeesIds.filter((employeeId) => this.state.employees[employeeId].idBase===draggableIdBase);

        if (existEmployeeId.length === 0) finishEmployeesIds.splice(destination.index, 0, draggableId);

        const newFinish ={
            ...finish,
            employeesIds: finishEmployeesIds
        };

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
            departmentOrder, departments, employees, onDelete, allEmployees
        } = this.state;

        return (
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
                                    onDelete={onDelete}
                                    allEmployees = {allEmployees}
                                />);
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    };
}