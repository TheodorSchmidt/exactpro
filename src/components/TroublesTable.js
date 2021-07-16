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
import { RemoveShoppingCartSharp } from '@material-ui/icons';

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

class TroublesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            troubles: undefined
        } 
    }
    
    componentDidMount() {
        fetch('http://130.61.51.1/api/alerts')
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                this.setState({troubles: data});
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            })
    }

    chooseRow = (e) => {
        this.props.changeValue(e);
        console.log(e);
    } 

    render() {
        return( 
            <MaterialTable
              title="Таблица с проблемами"
              icons={tableIcons}
              columns={[
                  {title: 'Alert ID', field: 'alertId' },
                  {title: 'Alert type', field: 'alertType' },
                  {title: 'Description', field: 'description', sorting: false, filtering: false },
                  {title: 'Affected transactions count', field: 'affectedTransactionsCount', sorting: false, filtering: false},
              ]}
              data={this.state.troubles}
              onRowClick={((e, selectedRow) => this.chooseRow(selectedRow.alertId))}
              options={{
                  sorting: true,
                  filtering: true,
                  rowStyle: rowData => ({
                    backgroundColor: (this.selectedRow === rowData.alertId) ? '#EEE' : '#FFF'
                  }),
                  exportButton: true
              }}
            />
        );
    }

}

export default TroublesTable;