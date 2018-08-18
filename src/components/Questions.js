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
            current:0,
            currentHint:-1,
            numberOfWrongAnswers:0,
            show:"question",
            feedback:"",
            bCorrectAnswer:null
        }
        this.answer=this.answer.bind(this);
        this.showHint=this.showHint.bind(this);
        this.returnToQuestion=this.returnToQuestion.bind(this);
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
                {this.state.questions.length>0 && this.state.show==="question" && <div className="center">
                    <div className="question">{this.state.questions[this.state.current].question}</div>
                    <div><input type="text" className="answer"/></div>
                    <div>
                        <button className="btn" onClick={this.answer}>יש לי תשובה</button>
                        {this.state.numberOfWrongAnswers>1 && <button className="btn" onClick={this.showHint}>מוכן לרמז {this.state.currentHint+1}</button>}
                    </div>
                </div>}
                {this.state.show==="hint" && 
                    <div className="center">
                        <div className="hint">{this.state.questions[this.state.current].hints[this.state.currentHint]}</div>
                        <div><button className="btn" onClick={this.returnToQuestion}>חזרה לשאלה</button></div>
                    </div>}
                {this.state.show==="feedback" && 
                    <div className="center">
                        <div className="feedback">{this.state.feedback}</div>
                        <div><button className="btn" onClick={this.returnToQuestion}>{this.state.bCorrectAnswer ? "השאלה הבאה" : "חזרה לשאלה"}</button></div>
                    </div>}
            </div>
        )
    }
    answer(){
        if (helper.trim(document.querySelector(".answer").value)==="")return;
        if (helper.trim(document.querySelector(".answer").value)===helper.trim(this.state.questions[this.state.current].answer)){
            let feedback=helper.trim(this.state.questions[this.state.current].feedbackAfterCorrectAnswer);
            if (!feedback){
                feedback="תשובה נכונה";
            }
            if (this.state.current+1<this.state.questions.length){
                this.setState(prevState=>({
                    show:"feedback",
                    feedback:feedback,
                    current:prevState.current+1,
                    numberOfWrongAnswers:0,
                    currentHint:-1,
                    bCorrectAnswer:true
                }))
            }
            else{
                this.props.setAppState("epilogue");
            }
        }else{
            let feedback=helper.trim(this.state.questions[this.state.current].feedbackAfterIncorrectAnswer);
            if (!feedback){
                feedback="תשובה לא נכונה";
            }
            this.setState(prev=>({
                show:"feedback",
                feedback:feedback,
                numberOfWrongAnswers:prev.numberOfWrongAnswers+1,
                currentHint:Math.min(this.state.questions[this.state.current].hints.length,Math.floor((prev.numberOfWrongAnswers+1)/2))-1,
                bCorrectAnswer:false                
            }))
        }
        document.querySelector(".answer").value="";
    }
    showHint(){
        this.setState({
            show:"hint"
        })
    }
    returnToQuestion(){
        this.setState({
            show:"question"
        })
    }
}
