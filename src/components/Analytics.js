import React, { Component } from 'react';
import TroublesTable from './TroublesTable';
import TransactionsTable from './TransactionsTable';

class Analytics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: undefined
        } 
    }

    renderTransactionsTable = () => {
        if (this.state.alert !== undefined) {
            return (
                <TransactionsTable alert={this.state.alert} />
            )
        } else {
            return (
                <p>Для вывода подробной информации по алерту, выберите алерт из таблицы сверху</p>
            )
        }
    }

    onChange = (val) => 
        this.setState({alert: val}
    ) 

    render() {
        return(
            <div>
                <p>Таблица с проблемами, найденными во время процесса "Анализ транзакций и создание оповещений":</p>
                <TroublesTable alert={this.state.alert} changeValue={this.onChange} />
                <p>Таблица со связанными транзакциями из входного набора транзакций:</p>
                {this.renderTransactionsTable()}
                <br/>
                <br/>
            </div>
        )
    }
}

export default Analytics;