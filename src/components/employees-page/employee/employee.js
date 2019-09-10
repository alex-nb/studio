import React, {Component} from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Card } from 'react-bootstrap';
import {deleteEmployee} from "../../../actions/employees";
import {connect} from "react-redux";
import './employee.css';
import Can from "../../../utils/can";

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
        const { employees,roles } = this.props;

        return  employees.map((employee, index) => <Employee roles={roles}
            key={employee.id} employee={employee} index={index} onDelete={this.onDelete}/> );
    };
}

const Employee = ({ employee, index, onDelete, roles }) => {
    return (
        <Draggable draggableId={employee.id} index={index}>
            {(provided, snapshot) => (
                <Card
                      {...provided.draggableProps} {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={snapshot.isDragging ? "employee check" : "employee"}
                      title={employee.name}
                >
                    <Card.Img src={employee.img} className="employee-img"/>
                    <Can
                        roles={roles}
                        perform="employee:delete"
                        yes={() => (
                            <Card.ImgOverlay className="employee-card-img-overlay">
                                <div className="icon-line">
                                    <i className="fas fa-trash icon-employee" onClick={() => onDelete(employee.idBase, employee.name)}/>
                                </div>
                            </Card.ImgOverlay>
                        )}
                        no={() => null}
                    />
                </Card>

            )}
        </Draggable>
    );
};

const mapStateToProps = ({ auth }) => {
    const { roles } = auth;
    return { roles };
};

export default connect(mapStateToProps, {deleteEmployee})(InnerListEmployee);