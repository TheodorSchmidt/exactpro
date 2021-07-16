import React, { Component } from "react";
import CurDate from "./Date";
import CurTime from "./Time";
import { Link } from 'react-router-dom';
// import { ReactSVG } from 'react-svg';
import logo from '../images/MSS.svg';

class Header extends Component {
    constructor(props) {
        super(props); 
    }

    renderFunctionality = () => {
        if (this.props.status !== 'success') {
            return (
                <nav className="header__nav__inactive nav">
                    <Link to="/home" className="nav__item">
                        Главная
                    </Link>
                    <span className="nav__item">
                        Аналитика
                    </span>
                    <span className="nav__item">
                        Отчетность
                    </span>
                </nav>
            )
        } else {
            return (
                <nav className="header__nav nav">
                    <Link to="/home" className="nav__item">
                        Главная
                    </Link>
                    <Link to="/analytics" className="nav__item">
                        Аналитика
                    </Link>
                    <Link to="/reporting" className="nav__item">
                        Отчетность
                    </Link>
                </nav>
            )
        }
    }

    render() {
        return (
            <div className="header">
                <Link className="header__brand" to="/home">
                    <img className="header__logo" src={logo} alt="icon" />
                </Link>
                {this.renderFunctionality()}
                <CurDate />
                <CurTime />
            </div>
        )
    }
}

export default Header;