import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ControlPointDuplicateOutlined } from '@material-ui/icons';


class Histogram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hist_status: 'downloading',
            transactions: undefined
        }
    }

    getConsideration(transactions) {
        const data = [];
        const map = new Map();  
        transactions.forEach((item) => { 
            if (map.has(item.executionEntityName)) {
                const val = map.get(item.executionEntityName);
                map.set(
                    item.executionEntityName, 
                    { 
                    name: item.executionEntityName,
                    quantity: (+val.quantity) + (+item.quantity),
                    price: (+val.price) + (+item.price)
                    }
                );
            } else {
                map.set(
                    item.executionEntityName,
                    { 
                    name: item.executionEntityName,
                    quantity: +item.quantity,
                    price: +item.price
                    }
                );
            }
        })
        map.forEach((item) => {
            data.push({name: item.name, consideration: item.quantity * item.price});
        })
        this.setState({hist_data: data});
        this.cutAndSort();
    }

    componentDidMount() {
        if (this.props.status === 'success') { 
            const transactions = [];
            const urlList = []; 
            this.props.troubles.forEach(item => {
                urlList.push(`http://130.61.51.1/api/transactions?alertId=${item.alertId}`)
            }) 
            const fetchPromises = [];
            urlList.forEach(url => {
                fetchPromises.push(fetch(url));
            });
            const resolvedPromises = Promise.all(fetchPromises);
            resolvedPromises.then(response => {
                response.forEach(r => {
                    const data = r.json();
                    data.then(ans => {
                        ans.forEach(a => {
                            transactions.push(a);
                        })
                        this.setState({transactions: transactions})
                    })
                })
                setTimeout(() =>
                    this.getConsideration(transactions)
                )
            }).catch(err => {
                this.setState({hist_status: 'error'});
            })
        }
    }

    cutAndSort() {
        const arr = [];
        const data = [];
        this.state.hist_data.forEach(i => {
            arr.push(i);
        })
        arr.sort((a, b) => {
            if (a.consideration < b.consideration) { return -1; }
            if (a.consideration > b.consideration) { return 1; }
            return 0;
        })
        if (arr.length <= 5) {
            arr.forEach((item) => {
                data.push(item);
            })
        } else {
            for (let i = 0; i < 5; i++) {
                data.push(arr[i]);
            }
        }
        this.setState({ hist_data: data, hist_status: 'success' });
    }
    
    renderHist() {
        if (this.state.hist_status === 'success') {
            return(
                <BarChart
                    width={800}
                    height={400}
                    data={this.state.hist_data}
                    margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5,
                    }}
                    barSize={80}
                >
                <XAxis dataKey="name" scale="point" padding={{ left: 50, right: 50 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 2" />
                <Bar dataKey="consideration" fill="#8884d8" background={{ fill: '#eee' }} />
                </BarChart>
            )
        } else {
            return(
                <div>Загрузка...</div>
            )
        }
    }
    render() { 
        return(
            this.renderHist()
        )
    }
}

export default Histogram;