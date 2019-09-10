import React, { Component } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {connect} from "react-redux";
import {updateTransaction} from "../../actions/transactions";
import Can from "../../utils/can";


class EditTransaction extends Component {

    state = {
        id: '',
        type: 'income',
        title: '',
        whom: '',
        summ: '',
        exp_id: '',
        employee: ''
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.id !== this.props.id) this.setState({id: this.props.id});
        if(prevProps.title !== this.props.title) this.setState({title: this.props.title});
        if(prevProps.type !== this.props.type) {
            this.setState({type: this.props.type, exp_id: '', employee: ''});
        }
        if(prevProps.whom !== this.props.whom) this.setState({whom: this.props.whom});
        if(prevProps.summ !== this.props.summ) this.setState({summ: this.props.summ});
        if(prevProps.exp_id !== this.props.exp_id) this.setState({exp_id: this.props.exp_id});
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
        if (prevProps.loadingUpdateTransaction !== this.props.loadingUpdateTransaction
            && !this.props.loadingUpdateTransaction
            && this.props.errorUpdateTransaction === null)  {
            this.props.onHide();
        }
    }

    onChange = (e) => {
        if (e.target.value === "income") this.setState({
            [e.target.name]: e.target.value,
            exp_id: '',
            employee: ''
        });
        else this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.updateTransaction(this.state);
        //this.props.onHide();
    };

    _selectExpenditure() {
        let all_expenditure = null;
        if (this.props.all_expenditure) {
            all_expenditure = this.props.all_expenditure.map((expend) => {
                return (<option key={expend._id} value={expend._id}>{expend.title}</option>);
            });
        }
        return (
            <Form.Group>
                <Form.Label>Статья</Form.Label>
                <Form.Control as="select"
                              required
                              name="exp_id"
                              value={this.state.exp_id}
                              onChange={this.onChange}
                >
                    <option/>
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
                              name="employee"
                              value={this.state.employee}
                              onChange={this.onChange}
                >
                    <option/>
                    {all_employees}
                </Form.Control>
            </Form.Group>
        )
    };

    render() {
        const { updateTransaction, loadingUpdateTransaction, errorUpdateTransaction, ...props } = this.props;
        return (
            <Can
                roles={this.props.roles}
                perform="transactions:edit"
                yes={() => (
                    <Modal
                        {...props}
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
                                <Button type="submit"
                                        disabled={this.props.loadingUpdateTransaction}>
                                    {this.props.loadingUpdateTransaction ? 'Секунду...' : 'Сохранить'}
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                )}
                no={() => null}
            />
        );
    }
}

const mapStateToProps = ({ auth, transactionsList }) => {
    const { loadingUpdateTransaction, errorUpdateTransaction } = transactionsList;
    const { roles } = auth;
    return { roles, loadingUpdateTransaction, errorUpdateTransaction };
};

export default connect(mapStateToProps, {updateTransaction})(EditTransaction);