import React, {Component} from 'react';
import EditExpenditure from './edit-expenditure';
import { Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import {fetchExpenditure} from '../../actions/expenditure';

import './finance.css';
import Spinner from "../layout/spinner";
import ErrorMessage from "../layout/error-message";

class Expenditure extends Component {

    state = {
        showModalEditForm: false,
        id_ex: '',
        name_ex: '',
        type: '',
        parent_exp: '0'
    };

    componentDidMount() {
        this.props.fetchExpenditure();
    }

    changeStateModalEditForm = () => {
        this.setState({ showModalEditForm: !this.state.showModalEditForm })
    };

    showModalEditForm = (expenditure) => {
        this.setState({
            id_ex: expenditure.id_ex,
            name_ex: expenditure.name_ex,
            type: expenditure.type,
            parent_exp: expenditure.parent_exp ? expenditure.parent_exp : null,
            showModalEditForm: true
        });
    };

    _expendituresList() {
        if (this.props.expenditure) {
            return this.props.expenditure.map((exp) => {
                if (!exp.idExpParent || exp.idExpParent === '') {
                    const idParent = exp._id;
                    const listChild = this.props.expenditure.filter(expChild => expChild.idExpParent === idParent).map((expChild) => {
                        return (
                            <li key={expChild._id}>
                                <a onClick={() => this.showModalEditForm({
                                    id_ex: expChild._id,
                                    name_ex: expChild.title,
                                    type: expChild.type,
                                    parent_exp: expChild.idExpParent
                                })}>
                                    {expChild.title} ({expChild.type})</a>
                                <span>{expChild.count}</span></li>);
                    });
                    return (
                        <li key={exp._id}>
                            <a onClick={() => this.showModalEditForm({
                                id_ex: exp._id,
                                name_ex: exp.title,
                                type: exp.type,
                                parent_exp: '0'
                            })}>
                                {exp.title} ({exp.type})</a>
                            <span>{exp.count}</span>
                            <ul>
                                {listChild}
                            </ul>
                        </li>
                    );
                }
                return null;
            });
        }
        return null;
    }

    render() {

        const {
            expenditure, loadingExpenditure, errorExpenditure
        } = this.props;

        if (loadingExpenditure) return (<div className="col-md-10 float-right"><Spinner/></div>);

        if (errorExpenditure) return (<div className="col-md-10 float-right"><ErrorMessage/></div>);

        return (
            <div className="col-md-10 float-right">
                <Button variant="secondary" onClick={() => this.showModalEditForm({
                    id_ex: '',
                    name_ex: '',
                    type: '',
                    parent_exp: '0'
                })}>Добавить</Button>
                <ul className="category-list">
                    {this._expendituresList()}
                </ul>
                <EditExpenditure
                    show={this.state.showModalEditForm}
                    onHide={this.changeStateModalEditForm}
                    name_ex={this.state.name_ex}
                    id_ex={this.state.id_ex}
                    type={this.state.type}
                    parent_exp={this.state.parent_exp}
                    expenditures={expenditure.filter(exp => !exp.idExpParent || exp.idExpParent === '')}
                />
            </div>

        );
    }
}

const mapStateToProps = ({ expenditureList }) => {
    const { expenditure, loadingExpenditure, errorExpenditure } = expenditureList;
    return { expenditure, loadingExpenditure, errorExpenditure };
};

export default connect(mapStateToProps, {fetchExpenditure})(Expenditure);