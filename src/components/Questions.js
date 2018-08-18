import React from "react";
import "../styles/index.scss";
import fire from "../fire";
import helper from "../helper";
const database=fire.database();

export default class Questions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            questions:[],
            current:0
        }
        this.answer=this.answer.bind(this);
    }
    componentDidMount(){
        this.loadData();        
    }
    loadData(){
        database.ref("questions").orderByChild("questionNum").once("value",snapshot=>{
            let questions = [];
            snapshot.forEach(function(child) {
                questions.push(child.val());
            });
            this.setState({
                questions:questions
            });
        })
    }
    render(){
        return (
            <div>
                {this.state.questions.length>0 && <div className="center">
                    <div className="question">{this.state.questions[this.state.current].question}</div>
                    <div><input type="text" className="answer"/></div>
                    <div><button className="btn" onClick={this.answer}>יש לי תשובה</button></div>
                </div>}
            </div>
        )
    }
    answer(){
        if (helper.trim(document.querySelector(".answer").value)===helper.trim(this.state.questions[this.state.current].answer)){
            const feedbackAfterCorrectAnswer=helper.trim(this.state.questions[this.state.current].feedbackAfterCorrectAnswer);
            if (feedbackAfterCorrectAnswer){
                alert (feedbackAfterCorrectAnswer);
            }else{
                alert ("תשובה נכונה");
            }
            
            if (this.state.current+1<this.state.questions.length){
                this.setState(prevState=>({
                    current:prevState.current+1
                }))
            }
            else{
                this.props.setAppState("epilogue");
            }
        }else{
            const feedbackAfterIncorrectAnswer=helper.trim(this.state.questions[this.state.current].feedbackAfterIncorrectAnswer);
            if (feedbackAfterIncorrectAnswer){
                alert (feedbackAfterIncorrectAnswer);
            }else{
                alert ("תשובה לא נכונה");
            };
        }
        document.querySelector(".answer").value="";
    }
}
