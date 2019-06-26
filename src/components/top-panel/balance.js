import React, {Component, Fragment} from 'react';
import BalanceHistory from './balance-history';

export default class Balance extends Component {

    state = {
        showModalBalanceHistory: false
    };

    changeStateModalBalanceHistory = () => {
        this.setState({ showModalBalanceHistory: !this.state.showModalBalanceHistory })
    };

    render () {
        const { balanceHistory, balance } = this.props;

        return (
            <Fragment>
                <span onClick={() => this.changeStateModalBalanceHistory()} title='Личный баланс'>{balance}</span>
                <BalanceHistory
                    show={this.state.showModalBalanceHistory}
                    onHide={this.changeStateModalBalanceHistory}
                    balanceHistory={balanceHistory}
                />
            </Fragment>
        );
    }

};