import React, {Component, Fragment} from 'react';
import {Modal, Pagination, Button}  from 'react-bootstrap';
import {getBalanceHistory} from "../../actions/personal-info";
import Spinner from "../layout/spinner";
import ErrorMessage from "../layout/error-message";
import {connect} from "react-redux";

class BalanceHistory extends Component {
    componentDidMount() {
        this.props.getBalanceHistory();
    }

    pageChanged = (e)=>{
        if (e.target.text === "›Next") {
            this.props.getBalanceHistory(this.props.paginationBalanceHistory.nextPage);
        }
        if (e.target.text === "‹Previous") {
            this.props.getBalanceHistory(this.props.paginationBalanceHistory.previousPage);
        }
    };

    _table() {
        const {balanceHistory, paginationBalanceHistory} = this.props;
        return (
            <Fragment>
                <table className="table table-hover table-sm">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Дата</th>
                        <th scope="col">Выдано</th>
                        <th scope="col">Начислено</th>
                        <th scope="col">Наименование</th>
                    </tr>
                    </thead>
                    <tbody>
                    {balanceHistory && balanceHistory.map((record) => {
                        let date = new Date(record.createdAt);
                        date = ("0" + date.getDate()).slice(-2)+"."+("0" + (date.getMonth() + 1)).slice(-2)+"."+date.getFullYear();
                        return (
                            <tr key={record._id}>
                                <th scope="row">{date}</th>
                                <td>{record.type==="expense" ? record.summ : null}</td>
                                <td>{record.type==="income" ? record.summ : null}</td>
                                <td>{record.title}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <Pagination size="lg" onClick={this.pageChanged}>
                    {paginationBalanceHistory.hasPreviousPage && <Pagination.Prev />}
                    {paginationBalanceHistory.hasNextPage && <Pagination.Next />}
                </Pagination>
            </Fragment>
        );
    }

    render() {
        const {balanceHistory, paginationBalanceHistory,
            getBalanceHistory, loadingBalanceHistory, errorBalanceHistory,
            ...modalProps} = this.props;
        return (
            <Modal
                {...modalProps}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        История баланса
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loadingBalanceHistory && <Spinner/>}
                    {errorBalanceHistory && <ErrorMessage/>}
                    {!loadingBalanceHistory && errorBalanceHistory===null && this._table()}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.props.onHide()}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
const mapStateToProps = ({ personalInfo }) => {
    const { balanceHistory, loadingBalanceHistory, errorBalanceHistory, paginationBalanceHistory } = personalInfo;
    return {
        balanceHistory, loadingBalanceHistory, errorBalanceHistory, paginationBalanceHistory
    };
};

export default connect(mapStateToProps, {getBalanceHistory})(BalanceHistory);