import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default class AskMoney extends Component {

    state = {
        money: '',
        time: ''
    };

    onTimeChange = (e) => {
        this.setState({
            time: e.target.value
        });
    };

    onMoneyChange = (e) => {
        this.setState({
            money: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { time, money } = this.state;
        console.log(time, money);
        this.setState({ time: '', money: '' });
        this.props.onHide();
        /*const cb = this.props.onItemAdded || (() => {});
        cb(label);*/
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
                                       onChange={this.onTimeChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="money">Сколько денег</label>
                                <input className="form-control" name="money" aria-describedby="describe"
                                       type="text" required
                                       value={this.state.money}
                                       onChange={this.onMoneyChange}/>
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
};