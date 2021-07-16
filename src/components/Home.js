import React, { Component } from 'react';
import download from '../images/download.png';
import okay from '../images/Tilda_Icons_27bu_1.svg';
import error from '../images/Tilda_Icons_27bu_6.svg';
class Home extends Component {
    constructor(props) {
        super(props);
    }

    currentStatus = () => {
        if (this.props.status === 'downloading') {
            return ( 
                <div className="status">
                    <p>Подождите, данные загружаются...</p>
                    <img src={download} alt='loading'/>
                </div>
            )
        } else if (this.props.status === 'error') {
            return (
                <div className="status">
                    <p>Извините, при загрузке данных произошла ошибка</p>
                    <img src={error} alt='error' />
                </div>
            )
        } else {
            return (
                <div className="status">
                    <p>Данные успешно загружены. Загружено {this.props.troubles.length} алерта</p>
                    <img src={okay} alt='success' />
                </div>
            )
        }
    }

    render() {
        return (
            <div className="home__info">
                <p>Система предназначена для мониторинга сделок, совершенных на бирже.</p>
                <p>Система разделена на две функциональности:</p>
                <ol>
                    <li>Data Accuracy module</li>
                    <li>Suspicious Activities module</li>
                </ol>
                <br/>
                <br/>
                {this.currentStatus()}
            </div>
        )
    }
}

export default Home;