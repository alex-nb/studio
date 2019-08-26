import React, {Component} from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Card } from 'react-bootstrap';
import './employee.css';

export default class InnerListEmployee extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.employees !== this.props.employees;
    }

    render() {
        const { employees, onDelete} = this.props;

        return  employees.map((employee, index) => <Employee
            key={employee.id} employee={employee} index={index} onDelete={() => onDelete(employee.idBase)}/> );
    };
};

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
                            <i className="fas fa-trash icon-employee" onClick={onDelete}/>
                        </div>
                    </Card.ImgOverlay>
                </Card>

            )}
        </Draggable>
    );
};