import React from 'react';

class CurTime extends React.Component {
    state = {date: new Date()};
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            date: new Date()
        });
    }
    render() {
        return(
            <div class="header__time">
                {this.state.date.toLocaleTimeString()}
            </div>
        )
    }
}

export default CurTime