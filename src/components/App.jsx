import React, { Component } from "react";
import styles from './App.module.scss';

export default class App extends Component {
    render() {
        return (
            <div className={styles.app}>
                <div className="page-content">
                    <h1>What are you waiting for?</h1>
                </div>
            </div>
        );
    }
}
