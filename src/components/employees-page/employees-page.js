import React, {Component} from 'react';
import { fetchCompanyStructure } from "../../actions";
import {compose} from "../../utils";
import {withBdApiService} from "../hoc";
import {connect} from "react-redux";
import Spinner from "../spinner";
import ErrorMessage from "../error-message";
import DragDropList from './drag-drop-list';


class EmployeesPage extends Component {

    componentDidMount() {
        this.props.fetchCompanyStructure();
    }

    render () {
        const {
            departmentOrder, departments, employees, allEmployeesList,
            loadingEmployees, loadingDepartmentOrder, loadingDepartments, loadingAllEmployeesList,
            errorEmployees, errorDepartments, errorDepartmentOrder, onDelete, errorAllEmployeesList
        } = this.props;

        if (loadingEmployees || loadingDepartmentOrder || loadingDepartments || loadingAllEmployeesList) {
            return (<Spinner/>);
        }

        if (errorEmployees || errorDepartments || errorDepartmentOrder || errorAllEmployeesList) {
            return <ErrorMessage/>;
        }

        return (<DragDropList
            departmentOrder={departmentOrder}
            departments={departments}
            employees={employees}
            onDelete={onDelete}
            allEmployees = {allEmployeesList}
        />);
    };
}

const mapStateToProps = ({
     departmentOrder, departments, employees, allEmployeesList,
     loadingEmployees, loadingDepartmentOrder, loadingDepartments, loadingAllEmployeesList,
     errorEmployees, errorDepartments, errorDepartmentOrder, onDelete, errorAllEmployeesList
}) => {
    return {
        departmentOrder, departments, employees, allEmployeesList,
        loadingEmployees, loadingDepartmentOrder, loadingDepartments, loadingAllEmployeesList,
        errorEmployees, errorDepartments, errorDepartmentOrder, onDelete, errorAllEmployeesList
    };
};

const mapDispatchToProps = (dispatch, { bdApiService }) => {
    return {
        fetchCompanyStructure: fetchCompanyStructure(bdApiService, dispatch),
        onDelete: (id) => {
            console.log(`delete ${id}`);
        }
    };
};

export default compose(
    withBdApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(EmployeesPage);