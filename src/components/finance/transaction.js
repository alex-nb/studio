import React, { Component } from 'react';

import { connect } from 'react-redux';
import {fetchTransaction} from '../../actions/transactions';
import {fetchExpenditure} from '../../actions/expenditure';
import {fetchAllEmployeesList} from '../../actions/employees';

import './finance.css';
import Spinner from "../layout/spinner";
import ErrorMessage from "../layout/error-message";
import {Button} from "react-bootstrap";
import EditTransaction from "./edit-transaction";


class Transaction extends Component {

    state = {
        showModalEditForm: false,
        id: '',
        type: '',
        date: '',
        title: '',
        whom: '',
        employee: '',
        summ: '',
        expenditure: ''
    };

    componentDidMount() {
        this.props.fetchTransaction();
        this.props.fetchExpenditure();
        this.props.fetchAllEmployeesList();
    }

    changeStateModalEditForm = () => {
        this.setState({ showModalEditForm: !this.state.showModalEditForm })
    };

    showModalEditForm = (transaction) => {
        this.setState({
            id: transaction.id,
            date: transaction.date,
            type: transaction.type,
            title: transaction.title,
            whom: transaction.whom,
            employee: transaction.employee,
            summ: transaction.summ,
            expenditure: transaction.expenditure,
            showModalEditForm: true
        });
    };

    _tableBody() {
        return this.props.transaction.map((trans) => {
            let date = new Date(trans.createdAt);
            let month = ''+(date.getMonth()+1);
            let day = ''+date.getDate();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            date = [day, month, date.getFullYear()].join('.');
            const whom = trans.whom ? trans.whom : trans.idEmployee.name;
            return (
                <tr key={trans._id}>
                    <td>{date}</td>
                    <td>{trans.type==="expense" ? "Расход" : "Доход"}</td>
                    <td>{trans.title}</td>
                    <td>{whom}</td>
                    <td>{trans.summ}</td>
                    <td>{trans.expenditure ? trans.expenditure.title : ""}</td>
                    <td>
                        <Button variant="secondary" onClick= { () => this.showModalEditForm({
                            id: trans._id,
                            date: trans.createdAt,
                            type: trans.type,
                            title: trans.title,
                            whom: trans.whom ? trans.whom : '',
                            employee: trans.idEmployee ? trans.idEmployee._id : '',
                            summ: trans.summ,
                            expenditure: trans.expenditure ? trans.expenditure.title : ""
                        })}>
                            <i className="fas fa-edit fa-actions"/>
                        </Button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        const {
            loadingTransaction, errorTransaction,
            expenditure, loadingExpenditure, errorExpenditure,
            allEmployeesList, loadingAllEmployeesList, errorAllEmployeesList
        } = this.props;

        if (loadingTransaction || loadingExpenditure || loadingAllEmployeesList)  return (<div className="col-md-10 float-right"><Spinner/></div>);
        if (errorTransaction || errorExpenditure || errorAllEmployeesList) return (<div className="col-md-10 float-right"><ErrorMessage/></div>);

        return(
            <div className="col-md-10 float-right">
                <Button variant="secondary" onClick= { () => this.showModalEditForm({
                    id: '',
                    type: '',
                    date: '',
                    title: '',
                    whom: '',
                    employee: '',
                    summ: '',
                    expenditure: ''
                })}>Добавить</Button>
                <table className="table table-hover table-sm">
                    <thead className="thead-dark">
                    <tr>
                        <th style={{width: "10%"}}>Дата</th>
                        <th style={{width: "10%"}}>Тип</th>
                        <th style={{width: "20%"}}>Название</th>
                        <th style={{width: "25%"}}>Кому/От кого</th>
                        <th style={{width: "15%"}}>Сумма</th>
                        <th style={{width: "15%"}}>Статья</th>
                        <th style={{width: "5%"}} />
                    </tr>
                    </thead>
                    <tbody>
                        {this._tableBody()}
                    </tbody>
                </table>
                <EditTransaction
                    show={this.state.showModalEditForm}
                    onHide={this.changeStateModalEditForm}
                    id={this.state.id}
                    type={this.state.type}
                    date={this.state.date}
                    title={this.state.title}
                    whom={this.state.whom}
                    employee={this.state.employee}
                    summ={this.state.summ}
                    expenditure={this.state.expenditure}
                    all_expenditure={expenditure}
                    all_employees={allEmployeesList}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ transactionsList, expenditureList, employeesList }) => {
    const { transaction, loadingTransaction, errorTransaction } = transactionsList;
    const {  expenditure, loadingExpenditure, errorExpenditure } = expenditureList;
    const { allEmployeesList, loadingAllEmployeesList, errorAllEmployeesList } = employeesList;
    return {
        transaction, loadingTransaction, errorTransaction,
        expenditure, loadingExpenditure, errorExpenditure,
        allEmployeesList, loadingAllEmployeesList, errorAllEmployeesList
    };
};

export default connect(mapStateToProps, {fetchTransaction, fetchExpenditure, fetchAllEmployeesList})(Transaction);