import React, { Component } from 'react';

import { connect } from 'react-redux';
import {fetchTransaction} from '../../actions/transactions';
import {fetchExpenditure} from '../../actions/expenditure';

import './finance.css';
import Spinner from "../layout/spinner";
import ErrorMessage from "../layout/error-message";
import {Button} from "react-bootstrap";
import EditTransaction from "./edit-transaction";


class Transaction extends Component {

    state = {
        showModalEditForm: false,
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

    changeStateModalEditForm = () => {
        this.setState({ showModalEditForm: !this.state.showModalEditForm })
    };

    showModalEditForm = (transaction) => {
        this.setState({
            id: transaction._id,
            date: transaction.date,
            title: transaction.title,
            whom: transaction.whom,
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
                    <td>{trans.title}</td>
                    <td>{whom}</td>
                    <td>{trans.summ}</td>
                    <td>{trans.expenditure.title}</td>
                    <td>
                        <Button variant="secondary" onClick= { () => this.showModalEditForm({
                            id: trans._id,
                            date: trans.createdAt,
                            title: trans.title,
                            whom: whom,
                            summ: trans.summ,
                            expenditure: trans.expenditure.title
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
            expenditure, loadingExpenditure, errorExpenditure
        } = this.props;

        if (loadingTransaction || loadingExpenditure)  return (<div className="col-md-10 float-right"><Spinner/></div>);

        if (errorTransaction || errorExpenditure) return (<div className="col-md-10 float-right"><ErrorMessage/></div>);

        return(
            <div className="col-md-10 float-right">
                <Button variant="secondary" onClick={() => this.changeStateModalEditForm()}>Добавить</Button>
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
                        {this._tableBody()}
                    </tbody>
                </table>
                <EditTransaction
                    show={this.state.showModalEditForm}
                    onHide={this.changeStateModalEditForm}
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