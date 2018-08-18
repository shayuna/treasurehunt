import React, { Component } from "react";
import RunningMessages from "./RunningMessages";
import '../styles/index.scss';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            mode:"prologue"
        }
        this.setAppState=this.setAppState.bind(this);
    }
    render() {
        return (
            <div className="font1">
                {this.state.mode==="prologue" && <RunningMessages type="prologue" setAppState={this.setAppState}/>}
                {this.state.mode==="questions" && <div>here should be the questions section god damn it</div>}
                {this.state.mode==="epilogue" && <RunningMessages type="epilogue" setAppState={this.setAppState}/>}
            </div>
        );
    }
    setAppState(mode){
        this.setState({
            mode:mode
        })
    }
}
