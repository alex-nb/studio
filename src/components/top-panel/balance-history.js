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
                        <th scope="col">Баланс</th>
                    </tr>
                    </thead>
                    <tbody>
                        {balanceHistory.map((record) => {
                            return (
                                <tr key={record.id}>
                                    <th scope="row">{record.date}</th>
                                    <td>{record.spending}</td>
                                    <td>{record.arrival}</td>
                                    <td>{record.balance}</td>
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