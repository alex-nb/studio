import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchRequestsMoney, setAnswerRequest} from '../../actions/requests';
import './finance.css';
import Spinner from "../layout/spinner";
import ErrorMessage from "../layout/error-message";
import {Button, ButtonGroup} from "react-bootstrap";
import Can from "../../utils/can";
import Pagination from "react-js-pagination";


class Requests extends Component {

    componentDidMount() {
        this.props.fetchRequestsMoney();
    }

    pageChanged = (pageNumber)=>{
        this.props.fetchRequestsMoney(pageNumber)
    };

    _tableBody() {
        return this.props.requestsMoney.map((request) => {
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
                    <Can
                        roles={this.props.roles}
                        perform="requests:edit"
                        yes={() => (
                            <td>
                                {request.status ==='granted' ?
                                    <Button variant="success" disabled><i className="fas fa-check fa-actions"/></Button> :
                                    request.status === 'denied' ?
                                        <Button variant="danger" disabled><i className="fas fa-times fa-actions"/></Button> :
                                        <ButtonGroup size="sm">
                                            <Button variant="success" onClick={() => {
                                                this.props.setAnswerRequest({id: request._id, status: "granted"})
                                            }}>Выдано</Button>
                                            <Button variant="danger" onClick={() => {
                                                this.props.setAnswerRequest({id: request._id, status: "denied"})
                                            }}>Отказано</Button>
                                        </ButtonGroup>
                                }
                            </td>
                        )}
                        no={() => <td/>}
                    />

                </tr>
            );
        });
    }

    render() {
        const { loadingRequestsMoney, errorRequestsMoney } = this.props;

        if (loadingRequestsMoney) return (<div className="col-md-10 float-right"><Spinner/></div>);

        if (errorRequestsMoney) return (<div className="col-md-10 float-right"><ErrorMessage/></div>);

        return(
            <Can
                roles={this.props.roles}
                perform="requests:visit"
                yes={() => (
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
                    </div>
                )}
                no={() => (<div className="col-md-10 float-right"><h3>Извините, доступ запрещен.</h3></div>)}
            />

        );
    }
}

const mapStateToProps = ({ requestsList, auth }) => {
    const { requestsMoney, loadingRequestsMoney, errorRequestsMoney, pagination } = requestsList;
    const { roles } = auth;
    return { requestsMoney, loadingRequestsMoney, errorRequestsMoney, roles, pagination };
};


export default connect(mapStateToProps, {fetchRequestsMoney, setAnswerRequest})(Requests);
