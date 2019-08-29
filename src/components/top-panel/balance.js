import React, {Component, Fragment} from 'react';
import BalanceHistory from './balance-history';
import { fetchPersonalInfo } from '../../actions/personal-info';
import {connect} from "react-redux";
import ErrorMessage from "../layout/error-message";
import Spinner from "../layout/spinner";


class Balance extends Component {

    state = {
        showModalBalanceHistory: false
    };

    componentDidMount() {
        this.props.fetchPersonalInfo();
    }

    changeStateModalBalanceHistory = () => {
        this.setState({ showModalBalanceHistory: !this.state.showModalBalanceHistory })
    };

    render () {
        const { personalInfo, balanceHistory, loadingPersonalInfo, errorPersonalInfo } = this.props;
        if (errorPersonalInfo) return <ErrorMessage/>;
        if (loadingPersonalInfo) return <Spinner/>;

        return (
            <Fragment>
                <span onClick={() => this.changeStateModalBalanceHistory()} title='Личный баланс'>{personalInfo.balance}</span>
                <BalanceHistory
                    show={this.state.showModalBalanceHistory}
                    onHide={this.changeStateModalBalanceHistory}
                    balanceHistory={balanceHistory}
                />
            </Fragment>
        );
    }

}
const mapStateToProps = ({ personal_info }) => {
    const { personalInfo, balanceHistory, loadingPersonalInfo, errorPersonalInfo } = personal_info;
    return { personalInfo, balanceHistory, loadingPersonalInfo, errorPersonalInfo };
};

export default connect(mapStateToProps, {fetchPersonalInfo})(Balance);
