import React, { Component } from 'react';

import { connect } from 'react-redux';
import {fetchTransaction} from '../../actions/transactions';
import {fetchExpenditure} from '../../actions/expenditure';

import './finance.css';
import Spinner from "../spinner";
import ErrorMessage from "../error-message";
import {Button} from "react-bootstrap";
import EditTransaction from "./edit-transaction";


class Transaction extends Component {

    state = {
        modalEditForm: false,
        id: '',
        date: '',
        title: '',
        whom: '',
        summ: '',
        expenditure: ''
    };

    componentDidMount() {
        this.props.fetchTransaction();
        this.props.fetchExpenditure();
    }

    render() {
        const {
            transaction, loadingTransaction, errorTransaction,
            expenditure, loadingExpenditure, errorExpenditure
        } = this.props;

        if (loadingTransaction || loadingExpenditure) {
            return (<div className="col-md-10 float-right"><Spinner/></div>);
        }

        if (errorTransaction || errorExpenditure) {
            return (<div className="col-md-10 float-right"><ErrorMessage/></div>);
        }

        const modalCloseEditForm = () => this.setState({ modalEditForm: false });
        const tableBody = transaction.map((trans) => {
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
                    <td>{trans.title}</td>
                    <td>{whom}</td>
                    <td>{trans.summ}</td>
                    <td>{trans.expenditure.title}</td>
                    <td>
                        <Button variant="secondary" onClick={() => this.setState({
                            id: trans._id,
                            date: trans.createdAt,
                            title: trans.title,
                            whom: whom,
                            summ: trans.summ,
                            expenditure: trans.expenditure.title,
                            modalEditForm: true })}>
                            <i className="fas fa-edit fa-actions"/>
                        </Button>
                    </td>
                </tr>
            );
        });

        return(
            <div className="col-md-10 float-right">
                <Button variant="secondary" onClick={() => this.setState({ modalEditForm: true })}>Добавить</Button>
                <table className="table table-hover table-sm">
                    <thead className="thead-dark">
                    <tr>
                        <th style={{width: "15%"}}>Дата</th>
                        <th style={{width: "20%"}}>Название</th>
                        <th style={{width: "25%"}}>Кому</th>
                        <th style={{width: "15%"}}>Сумма</th>
                        <th style={{width: "20%"}}>Статья</th>
                        <th style={{width: "5%"}} />
                    </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>
                <EditTransaction
                    show={this.state.modalEditForm}
                    onHide={modalCloseEditForm}
                    id={this.state.id}
                    date={this.state.date}
                    title={this.state.title}
                    whom={this.state.whom}
                    summ={this.state.summ}
                    expenditure={this.state.expenditure}
                    all_expenditure={expenditure}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ transactionsList, expenditureList }) => {
    const { transaction, loadingTransaction, errorTransaction } = transactionsList;
    const {  expenditure, loadingExpenditure, errorExpenditure } = expenditureList;
    return { transaction, loadingTransaction, errorTransaction, expenditure, loadingExpenditure, errorExpenditure };
};

export default connect(mapStateToProps, {fetchTransaction, fetchExpenditure})(Transaction);