import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchTransaction} from '../../actions/transactions';
import {fetchExpenditure} from '../../actions/expenditure';
import {fetchAllEmployeesList} from '../../actions/employees';
import Spinner from "../layout/spinner";
import ErrorMessage from "../layout/error-message";
import {Button} from "react-bootstrap";
import EditTransaction from "./edit-transaction";
import './finance.css';
import Can from "../../utils/can";
import Pagination from "react-js-pagination";

class Transactions extends Component {

    state = {
        showModalEditForm: false,
        id: '',
        type: '',
        date: '',
        title: '',
        whom: '',
        employee: '',
        summ: '',
        exp_id: ''
    };

    componentDidMount() {
        this.props.fetchTransaction();
        this.props.fetchExpenditure();
        this.props.fetchAllEmployeesList();
    }

    changeStateModalEditForm = () => {
        this.setState({ showModalEditForm: !this.state.showModalEditForm })
    };

    pageChanged = (pageNumber)=>{
        this.props.fetchTransaction(pageNumber)
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
            exp_id: transaction.exp_id,
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
            const whom = trans.idEmployee ? trans.idEmployee.name : trans.whom ? trans.whom : '';
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
                            type: trans.type,
                            title: trans.title,
                            whom: trans.whom ? trans.whom : '',
                            employee: trans.idEmployee ? trans.idEmployee._id : '',
                            summ: trans.summ,
                            exp_id: trans.expenditure ? trans.expenditure.idExp : ""
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
            <Can
                roles={this.props.roles}
                perform="transactions:visit"
                yes={() => (
                    <div className="col-md-10 float-right">
                        <Button variant="secondary" onClick= { () => this.showModalEditForm({
                            id: '',
                            type: '',
                            title: '',
                            whom: '',
                            employee: '',
                            summ: '',
                            exp_id: ''
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
                        <Pagination
                            activePage={this.props.pagination.currentPage}
                            totalItemsCount={this.props.pagination.totalItems}
                            itemsCountPerPage={this.props.pagination.itemsPerPage}
                            pageRangeDisplayed={5}
                            onChange={this.pageChanged}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                        <EditTransaction
                            show={this.state.showModalEditForm}
                            onHide={this.changeStateModalEditForm}
                            id={this.state.id}
                            type={this.state.type}
                            title={this.state.title}
                            whom={this.state.whom}
                            employee={this.state.employee}
                            summ={this.state.summ}
                            exp_id={this.state.exp_id}
                            all_expenditure={expenditure}
                            all_employees={allEmployeesList}
                        />
                    </div>
                )}
                no={() => (<div className="col-md-10 float-right"><h3>Извините, доступ запрещен.</h3></div>)}
            />
        );
    }
}

const mapStateToProps = ({ transactionsList, expenditureList, employeesList, auth }) => {
    const { transaction, loadingTransaction, errorTransaction, pagination } = transactionsList;
    const {  expenditure, loadingExpenditure, errorExpenditure } = expenditureList;
    const { allEmployeesList, loadingAllEmployeesList, errorAllEmployeesList } = employeesList;
    const { roles } = auth;
    return {
        transaction, loadingTransaction, errorTransaction,
        expenditure, loadingExpenditure, errorExpenditure,
        allEmployeesList, loadingAllEmployeesList, errorAllEmployeesList,
        roles, pagination
    };
};

export default connect(mapStateToProps, {fetchTransaction, fetchExpenditure, fetchAllEmployeesList})(Transactions);