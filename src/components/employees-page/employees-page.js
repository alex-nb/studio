import React, {Component} from 'react';
import { fetchCompanyStructure } from "../../actions/employees";
import {connect} from "react-redux";
import Spinner from "../spinner";
import ErrorMessage from "../error-message";
import DragDropList from './drag-drop-list';


class EmployeesPage extends Component {

    componentDidMount() {
        this.props.fetchCompanyStructure();
    }

    onDelete = (id) => {
        console.log(id);
    };

    render () {
        const {
            departmentOrder, departments, employees, allEmployeesList,
            loadingEmployees, loadingDepartmentOrder, loadingDepartments, loadingAllEmployeesList,
            errorEmployees, errorDepartments, errorDepartmentOrder, errorAllEmployeesList
        } = this.props;

        if (loadingEmployees || loadingDepartmentOrder || loadingDepartments || loadingAllEmployeesList) {
            return (<div className="col-md-10 float-right"><Spinner/></div>);
        }

        if (errorEmployees || errorDepartments || errorDepartmentOrder || errorAllEmployeesList) {
            return (<div className="col-md-10 float-right"><ErrorMessage/></div>);
        }

        return (
            <div className="col-md-10 float-right">
                <DragDropList
                    departmentOrder={departmentOrder}
                    departments={departments}
                    employees={employees}
                    onDelete={this.onDelete}
                    allEmployees = {allEmployeesList}
                />
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

export default connect(mapStateToProps, {fetchCompanyStructure})(EmployeesPage);