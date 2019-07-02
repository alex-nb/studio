import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Form, Row, Col} from "react-bootstrap";

export default class CloseProject extends Component {

    state = {
        summ: {},
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(Object.keys(this.state.summ).length === 0 && this.state.participants) {
            const participants = this.state.participants;
            if(participants.length > 0) {
                participants.map((people) => {
                    this.setState(nextState => ({
                        summ: {...nextState.summ, [people.idEmployee]: {
                                premium: 0,
                                fine: 0
                            }
                        },
                    }));
                    return null;
                });
            }
        }
    }

    onInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        const param = e.target.title;
        this.setState( prevState => ({ summ:
                    {...prevState.summ, [name] : {
                            ...prevState.summ[name],
                            [param] : value
                        }
                    }
            })
        );
    };

    onSubmit = (e) => {
        e.preventDefault();
        console.log( this.state );
        this.props.onHide();
    };

    _participantsList() {
        if (this.props.participants && Object.keys(this.state.summ).length !== 0) {
            return this.props.participants.map((people) => {
                return (
                    <Form.Group key={people.idEmployee} as={Row}>
                        <Form.Label column sm="1"><img alt={people.nameEmployee} className="employee-img" src={people.imgEmployee} title={people.nameEmployee}/></Form.Label>
                        <Col sm="5">
                            <Form.Control
                                required type="number" placeholder="Сумма премии"
                                name={people.idEmployee}
                                value={this.state.summ[people.idEmployee].premium}
                                onChange={this.onInputChange}
                                title='premium'
                            />
                        </Col>
                        <Col sm="5">
                            <Form.Control
                                required type="number" placeholder="Сумма штрафа"
                                name={people.idEmployee}
                                value={this.state.summ[people.idEmployee].fine}
                                onChange={this.onInputChange}
                                title='fine'
                            />
                        </Col>
                    </Form.Group>
                );
            });
        }
        return null;
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
                        Закрытие проекта
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.onSubmit}>
                    <Modal.Body>
                        Дедлайн: {this.props.deadline}
                        {this._participantsList()}
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