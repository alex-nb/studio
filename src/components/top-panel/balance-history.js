import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const BalanceHistory = (props) => {
    const {balanceHistory, ...modalProps} = props;
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
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.onHide()}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BalanceHistory;