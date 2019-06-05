import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class EditRate extends Component {
    state = {
        rate: this.props.rate
    };

    onRateChange = (e) => {
        this.setState({
            rate: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { rate } = this.state;
        console.log(rate);
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
                        Ставка сотрудника
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.onSubmit}>
                    <Modal.Body>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="rate">Новая ставка</label>
                                <input className="form-control" name="rate" aria-describedby="describe"
                                       type="number" required
                                       value={this.state.rate}
                                       onChange={this.onRateChange}/>
                            </div>
                        </fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Отмена</Button>
                        <Button type="submit">Сохранить</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}