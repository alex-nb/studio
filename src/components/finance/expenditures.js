import React, {Component} from 'react';
import EditExpenditure from './edit-expenditure';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {fetchExpenditure} from '../../actions/expenditure';
import Spinner from "../layout/spinner";
import ErrorMessage from "../layout/error-message";
import './finance.css';
import Can from "../../utils/can";

class Expenditures extends Component {

    state = {
        showModalEditForm: false,
        id: '',
        name: '',
        type: '',
        parent: '0'
    };

    componentDidMount() {
        this.props.fetchExpenditure();
    }

    changeStateModalEditForm = () => {
        this.setState({ showModalEditForm: !this.state.showModalEditForm })
    };

    showModalEditForm = (expenditure) => {
        this.setState({
            id: expenditure.id,
            name: expenditure.name,
            type: expenditure.type,
            parent: expenditure.parent ? expenditure.parent : null,
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
                                    id: expChild._id,
                                    name: expChild.title,
                                    type: expChild.type,
                                    parent: expChild.idExpParent
                                })}>
                                    {expChild.title} ({expChild.type})</a>
                                <span>{expChild.count}</span></li>);
                    });
                    return (
                        <li key={exp._id}>
                            <a onClick={() => this.showModalEditForm({
                                id: exp._id,
                                name: exp.title,
                                type: exp.type,
                                parent: '0'
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
            <Can
                roles={this.props.roles}
                perform="expenditures:visit"
                yes={() => (
                    <div className="col-md-10 float-right">
                        <Button variant="secondary" onClick={() => this.showModalEditForm({
                            id: '',
                            name: '',
                            type: '',
                            parent: '0'
                        })}>Добавить</Button>
                        <ul className="category-list">
                            {this._expendituresList()}
                        </ul>
                        <EditExpenditure
                            show={this.state.showModalEditForm}
                            onHide={this.changeStateModalEditForm}
                            name={this.state.name}
                            id={this.state.id}
                            type={this.state.type}
                            parent={this.state.parent}
                            expenditures={expenditure.filter(exp => !exp.idExpParent || exp.idExpParent === '')}
                        />
                    </div>
                )}
                no={() => (<div className="col-md-10 float-right"><h3>Извините, доступ запрещен.</h3></div>)}
            />
        );
    }
}

const mapStateToProps = ({ expenditureList, auth }) => {
    const { expenditure, loadingExpenditure, errorExpenditure } = expenditureList;
    const { roles } = auth;
    return { expenditure, loadingExpenditure, errorExpenditure, roles };
};

export default connect(mapStateToProps, {fetchExpenditure})(Expenditures);