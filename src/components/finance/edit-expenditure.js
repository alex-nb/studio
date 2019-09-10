import React, { Component } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {updateExpenditure} from "../../actions/expenditure";
import {connect} from "react-redux";
import Can from "../../utils/can";

class EditExpenditure extends Component {

    state = {
        name: '',
        id: '',
        type: 'орех',
        parent: ''
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.name !== this.props.name) this.setState({name: this.props.name});
        if(prevProps.id !== this.props.id) this.setState({id: this.props.id});
        if(prevProps.type !== this.props.type) this.setState({type: this.props.type});
        if(prevProps.parent !== this.props.parent) this.setState({parent: this.props.parent});
        if (prevProps.loadingUpdateExpenditure !== this.props.loadingUpdateExpenditure
            && !this.props.loadingUpdateExpenditure
            && this.props.errorUpdateExpenditure === null)  {
            this.props.onHide();
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.updateExpenditure(this.state);
    };

    _expendituresList() {
        if (this.props.expenditures) {
            return  this.props.expenditures.map((exp) => {
                return (<option key={exp._id} value={exp._id}>{exp.title}</option>);
            });
        }
        return null;
    };

    render() {
        const { updateExpenditure, loadingUpdateExpenditure, errorUpdateExpenditure, ...props } = this.props;
        return (
            <Can
                roles={this.props.roles}
                perform="expenditures:edit"
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
                                Статья расходов
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
                                    <Form.Label>Название</Form.Label>
                                    <Form.Control
                                        required type="text" placeholder="Название статьи"
                                        name="name"
                                        value={this.state.name}
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
                                                  name="parent"
                                                  value={this.state.parent}
                                                  onChange={this.onChange}
                                    >
                                        <option value="0"/>
                                        {this._expendituresList()}
                                    </Form.Control>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.props.onHide}>Отмена</Button>
                                <Button type="submit"
                                        disabled={this.props.loadingUpdateExpenditure}>
                                    {this.props.loadingUpdateExpenditure ? 'Секунду...' : 'Сохранить'}
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

const mapStateToProps = ({ auth, expenditureList }) => {
    const { roles } = auth;
    const {loadingUpdateExpenditure, errorUpdateExpenditure} = expenditureList;
    return { roles, loadingUpdateExpenditure, errorUpdateExpenditure };
};

export default connect(mapStateToProps, {updateExpenditure})(EditExpenditure);