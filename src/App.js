import './Style.scss';
import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Analytics from './components/Analytics';
import Reporting from './components/Reporting';
import Footer from './components/Footer';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      troubles: undefined,
      troublesForPieChart: [],
      status: 'downloading'
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
            let arr = [];
            data.forEach((item) => { 
              arr.push({name: item.alertType, value: +item.affectedTransactionsCount})
            })
            this.setState({
              troubles: data, 
              status: 'success',
              troublesForPieChart: arr
            }); 
        })
        .catch(error => {
            this.setState({ status: 'error' });
            console.error('There was an error!', error);
        })
    
  }
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header status={this.state.status}/>
          <main className="main">
            <Switch>
              <Redirect from="/" to="/home" exact />
              <Route path="/home">
                <Home status={this.state.status} troubles={this.state.troubles} />
              </Route>
              <Route path="/analytics">
                <Analytics status={this.state.status} troubles={this.state.troubles} />
              </Route>
              <Route path="/reporting">
                <Reporting status={this.state.status} troubles={this.state.troubles} alerts={this.state.troublesForPieChart}/>
              </Route>
            </Switch>
          </main>
        </div>
        <Footer />
      </BrowserRouter> 
    );

  }
}

export default App;
