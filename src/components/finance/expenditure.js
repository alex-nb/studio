import React, {Component} from 'react';
import EditExpenditure from './edit-expenditure';
import { Button } from 'react-bootstrap';
import { compose } from '../../utils';
import { connect } from 'react-redux';
import {fetchExpenditure} from '../../actions';
import { withBdApiService } from '../hoc';
import './finance.css';
import Spinner from "../spinner";
import ErrorMessage from "../error-message";

class Expenditure extends Component {

    state = {
        modalEditForm: false,
        id_ex: '',
        name_ex: '',
        type: '',
        parent_exp: '0'
    };

    componentDidMount() {
        this.props.fetchExpenditure();
    }

    render() {
        const modalCloseEditForm = () => this.setState({ modalEditForm: false });
        const {
            expenditure, loadingExpenditure, errorExpenditure
        } = this.props;

        if (loadingExpenditure) {
            return (<Spinner/>);
        }

        if (errorExpenditure) {
            return <ErrorMessage/>;
        }

        const listExpenditure = expenditure.map((exp) => {
            if (!exp.idExpParent || exp.idExpParent === '') {
                const idParent = exp._id;
                const arrayChild = expenditure.filter(expChild => expChild.idExpParent === idParent);
                const listChild = arrayChild.map((expChild) => {
                    return (
                        <li key={expChild._id}>
                            <a onClick={() => this.setState({
                                id_ex: expChild._id,
                                name_ex: expChild.title,
                                type: expChild.type,
                                parent_exp: expChild.idExpParent,
                                modalEditForm: true })}>
                            {expChild.title} ({expChild.type})</a>
                            <span>{expChild.count}</span></li>);
                });
                return (
                    <li key={exp._id}>
                        <a onClick={() => this.setState({
                            id_ex: exp._id,
                            name_ex: exp.title,
                            type: exp.type,
                            modalEditForm: true })}>
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

        const manyExpenditure = expenditure.filter(exp => !exp.idExpParent || exp.idExpParent === '');

        return (
            <div>
                <Button variant="secondary" onClick={() => this.setState({ modalEditForm: true })}>Добавить</Button>
                <ul className="category-list">
                    {listExpenditure}
                </ul>
                <EditExpenditure
                    show={this.state.modalEditForm}
                    onHide={modalCloseEditForm}
                    name_ex={this.state.name_ex}
                    id_ex={this.state.id_ex}
                    type={this.state.type}
                    parent_exp={this.state.parent_exp}
                    expenditures={manyExpenditure}
                />
            </div>

        );
    }
}

const mapStateToProps = ({ expenditure, loadingExpenditure, errorExpenditure }) => {
    return { expenditure, loadingExpenditure, errorExpenditure };
};

const mapDispatchToProps = (dispatch, { bdApiService }) => {
    return {
        fetchExpenditure: fetchExpenditure(bdApiService, dispatch)
    };
};

export default compose(
    withBdApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(Expenditure);