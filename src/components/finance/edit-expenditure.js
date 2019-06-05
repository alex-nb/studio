import React, { Component } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';


export default class EditExpenditure extends Component {

    state = {
        name_ex: '',
        id_ex: '',
        type: '',
        parent_exp: ''
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(nextProps.name_ex !== this.props.name_ex) this.setState({name_ex: nextProps.name_ex});
        if(nextProps.id_ex !== this.props.id_ex) this.setState({id_ex: nextProps.id_ex});
        if(nextProps.type !== this.props.type) this.setState({type: nextProps.type});
        if(nextProps.parent_exp !== this.props.parent_exp) this.setState({parent_exp: nextProps.parent_exp});
        if(nextProps.show !== this.props.show && nextProps.show === false) {
            this.setState({
                name_ex: '',
                id_ex: '',
                type: '',
                parent_exp: ''
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

    render() {
        const allExp = this.props.expenditures ? this.props.expenditures.map((exp) => {
            return (<option key={exp._id} value={exp._id}>{exp.title}</option>);
        }) : null;
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
                        Статья расходов
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.onSubmit}>
                    <Modal.Body>
                        <Form.Control
                            required type="hidden"
                            name="id_ex"
                            value={this.state.id_ex}
                        />
                        <Form.Group>
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                required type="text" placeholder="Название статьи"
                                name="name_ex"
                                value={this.state.name_ex}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Тип</Form.Label>
                            <Form.Control as="select"
                                          required
                                          name="type"
                                          value={this.state.type}
                                          onChange={this.onChange}
                            >
                                <option>орех</option>
                                <option>сорех</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Родительская статья</Form.Label>
                            <Form.Control as="select"
                                          name="parentExp"
                                          value={this.state.parent_exp}
                                          onChange={this.onChange}
                            >
                                <option value="0"/>
                                {allExp}
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