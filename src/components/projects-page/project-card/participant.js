import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const ReportsHistory = (props) => {
    const {departments, ...modalProps} = props;


    return (
        <Modal
            {...modalProps}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Участники проекта
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {departments}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.onHide()}>Закрыть</Button>
            </Modal.Footer>
        </Modal>

    );
};

export default ReportsHistory;