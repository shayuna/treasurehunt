import React from "react";
import "../styles/index.scss";
import fire from "../fire";
const database=fire.database();

export default class RunningMessages extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            messages:[],
            current:0
        }
        this.next=this.next.bind(this);
    }
    componentDidMount(){
        this.loadData();        
    }
    loadData(){
        database.ref(this.props.type).once("value",snapshot=>{
            let messages = [];
            snapshot.forEach(function(child) {
                messages.push(child.val());
            });
            this.setState({
                messages:messages
            });
        })
    }
    render(){
        return (
            <div className="center">
                {this.state.messages[this.state.current]}
                {this.state.messages.length>0 && <div><button onClick={this.next}>הלאה מכאן</button></div>}
            </div>
        )
    }
    next(){
        if (this.state.current+1<this.state.messages.length){
            this.setState(prevState=>({
                current:prevState.current+1
            }))
        }else{
            this.props.setAppState("questions");
        }
    }
}
