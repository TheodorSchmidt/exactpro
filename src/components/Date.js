import React from 'react';

class CurDate extends React.Component {
    state = {date: new Date()}
    render() {
        return (
            <div class="header__date">
                <p>{this.state.date.toLocaleDateString()}</p>
            </div>
        );
    }
}

export default CurDate;