import React, {Component} from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Card } from 'react-bootstrap';
import {deleteEmployee} from "../../../actions/employees";
import {connect} from "react-redux";
import './employee.css';

class InnerListEmployee extends Component {

    onDelete = (id, name) => {
        if (window.confirm(`Вы уверены, что хотите удалить сотрудника ${name}?`)) {
            this.props.deleteEmployee(id);
        }
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.employees !== this.props.employees;
    }

    render() {
        const { employees } = this.props;

        return  employees.map((employee, index) => <Employee
            key={employee.id} employee={employee} index={index} onDelete={this.onDelete}/> );
    };
}

const Employee = ({ employee, index, onDelete }) => {
    return (
        <Draggable draggableId={employee.id} index={index}>
            {(provided, snapshot) => (
                <Card
                      {...provided.draggableProps} {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={snapshot.isDragging ? "employee check" : "employee"}
                      title={employee.name}
                >
                    <Card.Img src={employee.img} />
                    <Card.ImgOverlay>
                        <div className="icon-line">
                            <i className="fas fa-trash icon-employee" onClick={() => onDelete(employee.idBase, employee.name)}/>
                        </div>
                    </Card.ImgOverlay>
                </Card>

            )}
        </Draggable>
    );
};

export default connect(null, {deleteEmployee})(InnerListEmployee);