import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ReportsHistory = (props) => {
    const {reports, ...modalProps} = props;
    const tbody = reports ? reports.map((report) => {
        const classRow = report.idReport.status ==='accepted' ? "table-success" : report.idReport.status === 'rejected' ? "table-danger" : "table-secondary";
        return (
            <tr key={report.idReport._id} className={classRow}>
                <th scope="row">{report.idEmployee.name}</th>
                <th>{report.idReport.date}</th>
                <td>{report.idReport.report}</td>
                <td title="работа/обучение">{report.idReport.hoursWork}/{report.idReport.hoursStudy}</td>
                <td>{report.idReport.status ==='accepted' ? "Принято!" : report.idReport.status === 'rejected' ? "Врушка!" : "Нейтрально"}</td>
            </tr>
        );
    }) : null;

    return (
        <Modal
            {...modalProps}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Отчеты
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-hover table-sm">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Сотрудник</th>
                        <th scope="col">Дата</th>
                        <th scope="col">Отчет</th>
                        <th scope="col">Время</th>
                        <th scope="col">Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                        {tbody}
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.onHide()}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReportsHistory;