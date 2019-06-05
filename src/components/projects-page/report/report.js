import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class Report extends Component {

    state = {
        time: '',
        report: ''
    };

    onTimeChange = (e) => {
        this.setState({
            time: e.target.value
        });
    };

    onReportChange = (e) => {
        this.setState({
            report: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { time, report } = this.state;
        console.log(time, report);
        this.setState({ time: '', report: '' });
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
                        Отчет
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.onSubmit}>
                    <Modal.Body>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="timeFact">Фактическое время</label>
                                <input className="form-control" name="timeFact" aria-describedby="describe"
                                       placeholder="Сколько времени вы потратили?" type="text" required
                                       value={this.state.time}
                                       onChange={this.onTimeChange}/>
                                <small id="describe" className="form-text text-muted">Будьте честны.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="report">Ваш отчет</label>
                                <textarea className="form-control" name="report" rows="20" placeholder="Сегодня я..." required
                                          value={this.state.report}
                                          onChange={this.onReportChange}/>
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