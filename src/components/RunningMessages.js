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
        if (this.state.messages[this.state.current] && this.state.messages[this.state.current].indexOf("/images/")===-1){
            return (
                <div className="center fullBGSize runningMessagesWrapper">
                    <div className="msg">
                        {
                            this.state.messages[this.state.current].split("||").map((itm,ii)=>
                                <div key={ii}>{itm}</div>
                            )
                        }
                    </div>
                    {this.state.messages.length>0 && !this.props.excludeButton && <div><button className="btn" onClick={this.next}>Next Please</button></div>}
                </div>
            )
        }
        else if (this.state.messages[this.state.current]){
            return (
                <div className="center fullBGSize" style={{backgroundImage:"url("+this.state.messages[this.state.current]+")"}}>
                    {this.state.messages.length>0 && !this.props.excludeButton && <div><button className="btn bottomMe" onClick={this.next}>Next Please</button></div>}
                </div>
            )
        }
        else{
            return (
                <div></div>
            )
        }
    }
    next(){
        if (this.state.current+1<this.state.messages.length){
            this.setState(prevState=>({
                current:prevState.current+1
            }))
        }else{
            if (this.props.type==="prologue")this.props.setAppState("questions");
        }
    }
}
