import React, { Component } from 'react';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
class TransactionsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: undefined,
            status: 'notChosen'
        }
    }

    componentDidMount() {
        fetch(`http://130.61.51.1/api/transactions?alertId=${this.props.alert}`)
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            this.setState({ transactions: data, status: 'success' });
        }) 
        .catch(error => {
            this.setState({ status: 'error' });
            console.error('There was an error!', error);
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.alert !== prevProps.alert) {
            fetch(`http://130.61.51.1/api/transactions?alertId=${this.props.alert}`)
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                this.setState({ transactions: data, status: 'success' });
            }) 
            .catch(error => {
                this.setState({ status: 'error' });
                console.error('There was an error!', error);
            })
        }
    }

    render() {
        return (
            <MaterialTable
              title="Таблица с транзакциями"
              icons={tableIcons}
              columns={[
                  { title: 'Alert ID', field: 'alertId', sorting: false, filtering: false },
                  { title: 'Transaction ID', field: 'transactionId', sorting: false, filtering: false },
                  { title: 'Execution Entity Name', field: 'executionEntityName' },
                  { title: 'Instrument Name', field: 'instrumentName'},
                  { title: 'Instrument Classification', field: 'instrumentClassification' },
                  { title: 'Quantity', field: 'quantity', sorting: false, filtering: false },
                  { title: 'Price', field: 'price', sorting: false, filtering: false },
                  { title: 'Currency', field: 'currency', sorting: false, filtering: false },
                  { title: 'Datestamp', field: 'datestamp', sorting: false, filtering: false },
                  { title: 'Net Amount', field: 'netAmount', sorting: false, filtering: false }
              ]}
              data={this.state.transactions}
              options={{
                  sorting: true,
                  filtering: true,
                  exportButton: true
              }}
            />
        )
    }
}

export default TransactionsTable;