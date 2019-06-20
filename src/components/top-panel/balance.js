import React, {Component, Fragment} from 'react';
import BalanceHistory from './balance-history';

export default class Balance extends Component {

    state = {
        modalBalanceHistory: false
    };

    render () {
        const modalBalanceHistory = () => this.setState({ modalBalanceHistory: false });
        const { balanceHistory, balance } = this.props;

        return (
            <Fragment>
                <span onClick={() => this.setState({ modalBalanceHistory: true })} title='Личный баланс'>{balance}</span>
                <BalanceHistory
                    show={this.state.modalBalanceHistory}
                    onHide={modalBalanceHistory}
                    balanceHistory={balanceHistory}
                />
            </Fragment>
        );
    }

};