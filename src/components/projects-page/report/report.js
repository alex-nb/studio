import React, { Component } from 'react';
import {Form, Button, Modal} from "react-bootstrap";

export default class Report extends Component {

    state = {
        timeWork: '',
        report: '',
        timeStudy: '',
        idProject: ''
    };

    componentDidUpdate(prevProps) {
        if(prevProps.id_project !== this.props.id_project) this.setState({idProject: this.props.id_project})
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.setState({
            timeWork: '',
            report: '',
            timeStudy: ''
        });
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
                        Отчет
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.onSubmit}>
                    <Modal.Body>
                        <fieldset>
                            <Form.Control
                                required type="hidden"
                                name="idProject"
                                value={this.state.idProject}
                            />
                            <Form.Group>
                                <Form.Label>Время работы</Form.Label>
                                <Form.Control
                                    required
                                    onChange={this.onInputChange}
                                    type="number"
                                    name="timeWork"
                                    value={this.state.timeWork}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Время обучения</Form.Label>
                                <Form.Control
                                    required
                                    onChange={this.onInputChange}
                                    type="number"
                                    name="timeStudy"
                                    value={this.state.timeStudy}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Ваш отчет</Form.Label>
                                <Form.Control
                                    as="textarea" rows="20"
                                    placeholder="Сегодня я..."
                                    required
                                    onChange={this.onInputChange}
                                    name="report"
                                    value={this.state.report}
                                />
                            </Form.Group>
                        </fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Отмена</Button>
                        <Button type="submit">Отправить</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
};