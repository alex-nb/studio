import React, { Component } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';


export default class EditTransaction extends Component {

    state = {
        id: '',
        date: '',
        title: '',
        whom: '',
        summ: '',
        expenditure: ''
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(nextProps.id !== this.props.id) this.setState({id: nextProps.id});
        if(nextProps.title !== this.props.title) this.setState({title: nextProps.title});
        if(nextProps.whom !== this.props.whom) this.setState({whom: nextProps.whom});
        if(nextProps.summ !== this.props.summ) this.setState({summ: nextProps.summ});
        if(nextProps.expenditure !== this.props.expenditure) this.setState({expenditure: nextProps.expenditure});
        if(nextProps.date !== this.props.date) {
            let date = new Date(nextProps.date);
            let month = '' + (date.getMonth() + 1);
            let day = '' + date.getDate();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            date = [date.getFullYear(), month, day].join('-');
            this.setState({date: date});
        }

        if(nextProps.show !== this.props.show && nextProps.show === false) {
            this.setState({
                id: '',
                date: '',
                title: '',
                whom: '',
                summ: '',
                expenditure: ''
            });
        }

    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.onHide();
        /*const cb = this.props.onItemAdded || (() => {});
        cb(label);*/
    };

    _expendituresList() {
        if (this.props.all_expenditure) {
            return  this.props.all_expenditure.map((expend) => {
                return (<option key={expend._id}>{expend.title}</option>);
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
                        Расход
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
                            <Form.Label>Дата</Form.Label>
                            <Form.Control
                                required type="date"
                                name="date"
                                value={this.state.date}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                required type="text" placeholder="Название расхода"
                                name="title"
                                value={this.state.title}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Кому</Form.Label>
                            <Form.Control
                                required type="text" placeholder="Кому"
                                name="whom"
                                value={this.state.whom}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Сумма</Form.Label>
                            <Form.Control
                                required type="number" placeholder="Сумма"
                                name="summ"
                                value={this.state.summ}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Статься</Form.Label>
                            <Form.Control as="select"
                                          required
                                          name="expenditure"
                                          value={this.state.expenditure}
                                          onChange={this.onChange}
                            >
                                {this._expendituresList}
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Отмена</Button>
                        <Button type="submit">Сохранить</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
};