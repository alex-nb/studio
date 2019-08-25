import React, { Component } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';


export default class EditTransaction extends Component {

    state = {
        id: '',
        type: 'income',
        date: '',
        title: '',
        whom: '',
        summ: '',
        expenditure: '',
        employee: ''
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.id !== this.props.id) this.setState({id: this.props.id});
        if(prevProps.title !== this.props.title) this.setState({title: this.props.title});
        if(prevProps.type !== this.props.type) this.setState({type: this.props.type});
        if(prevProps.whom !== this.props.whom) this.setState({whom: this.props.whom});
        if(prevProps.summ !== this.props.summ) this.setState({summ: this.props.summ});
        if(prevProps.expenditure !== this.props.expenditure) this.setState({expenditure: this.props.expenditure});
        if(prevProps.employee !== this.props.employee) this.setState({employee: this.props.employee});
        if(prevProps.date !== this.props.date) {
            let date;
            if (this.props.date.length > 0) date = new Date(this.props.date);
            else date = new Date();
            let month = '' + (date.getMonth() + 1);
            let day = '' + date.getDate();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            date = [date.getFullYear(), month, day].join('-');
            this.setState({date: date});
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
    };

    _selectExpenditure() {
        let all_expenditure = null;
        if (this.props.all_expenditure) {
            all_expenditure = this.props.all_expenditure.map((expend) => {
                return (<option key={expend._id}>{expend.title}</option>);
            });
        }
        return (
            <Form.Group>
                <Form.Label>Статья</Form.Label>
                <Form.Control as="select"
                              required
                              name="expenditure"
                              value={this.state.expenditure}
                              onChange={this.onChange}
                >
                    {all_expenditure}
                </Form.Control>
            </Form.Group>
        )
    };

    _selectEmployee() {
        let all_employees = null;
        if (this.props.all_employees) {
            all_employees = this.props.all_employees.map((employee) => {
                return (<option key={employee._id} value={employee._id}>{employee.name}</option>);
            });
        }
        return (
            <Form.Group>
                <Form.Label>Сотрудник</Form.Label>
                <Form.Control as="select"
                              required
                              name="employee"
                              value={this.state.employee}
                              onChange={this.onChange}
                >
                    <option></option>
                    {all_employees}
                </Form.Control>
            </Form.Group>
        )
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
                        Операция
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
                            <Form.Label>Тип операции</Form.Label>
                            <Form.Control as="select"
                                          required
                                          name="type"
                                          value={this.state.type}
                                          onChange={this.onChange}
                            >
                                <option value="income">доход</option>
                                <option value="expense">расход</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                required type="text" placeholder="Название операции"
                                name="title"
                                value={this.state.title}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Кому/От кого</Form.Label>
                            <Form.Control
                                type="text" placeholder="Кому/От кого"
                                name="whom"
                                value={this.state.whom}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        {this.state.type==="expense" ? this._selectEmployee() : ""}
                        <Form.Group>
                            <Form.Label>Сумма</Form.Label>
                            <Form.Control
                                required type="number" placeholder="Сумма"
                                name="summ"
                                value={this.state.summ}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        {this.state.type==="expense" ? this._selectExpenditure() : ""}
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