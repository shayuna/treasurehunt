import React, { Component } from "react";
import RunningMessages from "./RunningMessages";
import Questions from "./Questions";
import '../styles/index.scss';
import helper from "../helper";

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            mode:"prologue",
            current:0
        }
        this.setAppState=this.setAppState.bind(this);
    }
    componentDidMount(){
        if (helper.findValInQueryString(window.location.search,"r")==="1"){
            this.setState({
                mode:"prologue",
                current:0
            })
            localStorage.removeItem("current");
        }
        else if (helper.findValInQueryString(window.location.search,"q") || 
                 (localStorage.getItem("current") && parseInt(localStorage.getItem("current"),10)>=0)){
            this.setState({
                mode:"questions",
                current:helper.findValInQueryString(window.location.search,"q") ? parseInt(helper.findValInQueryString(window.location.search,"q"),10) : parseInt(localStorage.getItem("current"),10)
            });
        }
    }
    render() {
        return (
            <div className="font1">
                {this.state.mode==="prologue" && <RunningMessages type="prologue" setAppState={this.setAppState}/>}
                {this.state.mode==="questions" && <Questions setAppState={this.setAppState} current={this.state.current}/>}
                {this.state.mode==="epilogue" && <RunningMessages type="epilogue" setAppState={this.setAppState} excludeButton={true}/>}
            </div>
        );
    }
    setAppState(mode){
        this.setState({
            mode:mode
        })
    }
}
