import React, { Component } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {updateReport} from '../../actions/reports';
import {connect} from "react-redux";

class RejectedReport extends Component {
    state = {
        acceptedHoursWork: 0,
        acceptedHoursStudy: 0,
        reason: '',
        id: '',
        action: 'reject'
    };

    componentDidUpdate(prevProps) {
        if(prevProps.id_report !== this.props.id_report) this.setState({id: this.props.id_report})
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.updateReport(this.state);
        this.props.onHide();
    };

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Отклонение отчета
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.onSubmit}>
                    <Modal.Body>
                        <Form.Control
                            required type="hidden"
                            name="id"
                            value={this.state.id}
                        />
                        <Form.Group>
                            <Form.Label>Количество принятых часов работы</Form.Label>
                            <Form.Control
                                required type="number"
                                name="acceptedHoursWork"
                                value={this.state.acceptedHoursWork}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Количество принятых часов обучения</Form.Label>
                            <Form.Control
                                required type="number"
                                name="acceptedHoursStudy"
                                value={this.state.acceptedHoursStudy}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Причина</Form.Label>
                            <Form.Control
                                as="textarea" rows="10"
                                required
                                onChange={this.onChange}
                                name="reason"
                                value={this.state.reason}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Отмена</Button>
                        <Button type="submit">Сохранить</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default connect(null, {updateReport})(RejectedReport);
