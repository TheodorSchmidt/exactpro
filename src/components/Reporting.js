import React, { Component } from 'react';
import Pichart from './PieChart';
import Histogram from './Histogram';

class Reporting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: undefined
        };
    }

    cutAndSort(alerts) {
        const arr = [];
        this.props.troubles.forEach(i => {
            arr.push(i);
        })
        arr.sort((a, b) => {
            if (a.affectedTransactionsCount < b.affectedTransactionsCount) { return -1; }
            if (a.affectedTransactionsCount > b.affectedTransactionsCount) { return 1; }
            return 0;
        })
        if (arr.length <= 5) {
            arr.forEach((item) => {
                alerts.push(item);
            })
        } else {
            for (let i = 0; i < 5; i++) {
                alerts.push(arr[i]);
            }
        }
    }


    render() {
        return(
            <div>
                <p>График, отражающий долю всех типов сгенерированных алертов с количеством заафекченных транзакций в результате процесса "Анализ транзакций и создание оповещений":</p>
                <Pichart alerts={this.props.alerts} />
                <p>Отражает топ-5 Execution Entity Name, отсортированных по значению Consideration по возрастанию в результате процесса "Анализ транзакций и создание оповещений":</p>
                <Histogram troubles={this.props.troubles} status={this.props.status}/>
                <br/>
            </div>
        ) 
    } 
}

export default Reporting;