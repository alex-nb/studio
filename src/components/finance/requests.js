import React, { Component } from 'react';

import { connect } from 'react-redux';
import {fetchRequestsMoney} from '../../actions/requests';

import './finance.css';

import Spinner from "../layout/spinner";
import ErrorMessage from "../layout/error-message";
import {Button, ButtonGroup} from "react-bootstrap";


class Requests extends Component {
    componentDidMount() {
        this.props.fetchRequestsMoney();
    }

    render() {
        const {
            requestsMoney, loadingRequestsMoney, errorRequestsMoney
        } = this.props;

        if (loadingRequestsMoney) {
            return (<div className="col-md-10 float-right"><Spinner/></div>);
        }

        if (errorRequestsMoney) {
            return (<div className="col-md-10 float-right"><ErrorMessage/></div>);
        }

        const tableBody = requestsMoney.map((request) => {
            let date = new Date(request.createdAt);
            let month = ''+(date.getMonth()+1);
            let day = ''+date.getDate();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            date = [day, month, date.getFullYear()].join('.');
            return (
                <tr key={request._id}>
                    <td>{date}</td>
                    <td>{request.idEmployee.name}</td>
                    <td>{request.dateUntil}</td>
                    <td>{request.sum}</td>
                    <td>
                        <ButtonGroup size="sm">
                            <Button variant="success">Выдано</Button>
                            <Button variant="danger">Отказано</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            );
        });

        return(
            <div className="col-md-10 float-right">
                <table className="table table-hover table-sm">
                    <thead className="thead-dark">
                    <tr>
                        <th style={{width: "15%"}}>Дата</th>
                        <th style={{width: "15%"}}>Сотрудник</th>
                        <th style={{width: "40%"}}>До какого числа</th>
                        <th style={{width: "15%"}}>Сколько</th>
                        <th style={{width: "15%"}} />
                    </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = ({ requestsList }) => {
    const { requestsMoney, loadingRequestsMoney, errorRequestsMoney } = requestsList;
    return { requestsMoney, loadingRequestsMoney, errorRequestsMoney };
};


export default connect(mapStateToProps, {fetchRequestsMoney})(Requests);
