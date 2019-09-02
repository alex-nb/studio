import React, { PureComponent } from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";
import InnerListEmployee from "../employee";
import DropdownEmployee from "../dropdown-employee";

import './department-list.css';

const DepartmentList = ({ dept, index, employees, onDelete, allEmployees }) => {
    return (
        <Draggable draggableId={dept.id} index={index}>
            {(provided) => (
                <div className="department-list"
                     {...provided.draggableProps}
                     ref={provided.innerRef}
                >
                    <h3 {...provided.dragHandleProps}>{dept.title}
                        <DropdownEmployee allEmployees={allEmployees} dept={dept.id}/>
                    </h3>
                    <Droppable
                        droppableId={dept.id}
                        direction="horizontal"
                        type="employee"
                    >
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={snapshot.isDraggingOver ? "employees-list check-list" : "employees-list"}
                            >
                                <InnerListEmployee employees={employees} onDelete={onDelete} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};

export default class InnerListDepartment extends PureComponent {
    render() {
        const  {dept, employeeMap, index, onDelete, allEmployees } = this.props;
        const employees = dept.employeesIds.map(employeeId => employeeMap[employeeId]);
        return <DepartmentList dept={dept} employees={employees} index={index} onDelete={onDelete} allEmployees = {allEmployees} />;
    };
}
