import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {createRequest} from "../../actions/requests";
import {connect} from "react-redux";

class AskMoney extends Component {

    state = {
        money: '',
        time: ''
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createRequest(this.state);
        this.setState({ time: '', money: '' });
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
                        Хочу
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.onSubmit}>
                    <Modal.Body>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="time">До какого числа</label>
                                <input className="form-control" name="time" aria-describedby="describe"
                                       type="date" required
                                       value={this.state.time}
                                       onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="money">Сколько денег</label>
                                <input className="form-control" name="money" aria-describedby="describe"
                                       type="text" required
                                       value={this.state.money}
                                       onChange={this.onChange}/>
                            </div>
                        </fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Отмена</Button>
                        <Button type="submit">Отправить</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default connect(null, {createRequest})(AskMoney);