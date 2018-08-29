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
            current:props.current ? props.current : 0,
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
        this.rememberQuestion(this.state.current);
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
                {this.state.questions.length>0 && this.state.show==="question" && <div className="center questionWrapper fullBGSize">
                    <div className="question">
                    {
                        this.state.questions[this.state.current].question.split("||").map ((itm,ii)=>
                                <div key={ii}>{itm}</div>
                        )
                    }
                    </div>
                    <div className="centerMe"><input type="text" className="answer"/></div>
                    <div>
                        <button className="btn" onClick={this.answer}>Next</button>
                    </div>
                </div>}
                {this.state.show==="hint" &&  
                    <div className="center hintWrapper fullBGSize">
                        {this.state.questions[this.state.current].hints[this.state.currentHint].indexOf("/images/")===-1 && <div className="hint">{this.state.questions[this.state.current].hints[this.state.currentHint]}</div>}
                        {this.state.questions[this.state.current].hints[this.state.currentHint].indexOf("/images/")>-1 && <div className="hint img" style={{backgroundImage:"url("+this.state.questions[this.state.current].hints[this.state.currentHint]+")" }}></div>}
                        <div><button className="btn" onClick={this.returnToQuestion}>חזרה למשימה</button></div>
                    </div>
                }
                {this.state.show==="feedback" && 
                    <div className={"center fullBGSize "+(this.state.bCorrectAnswer ? "feedbackCorrectAnswer" : "feedbackIncorrectAnswer")}>
                        <div className={this.state.bCorrectAnswer ? "happySmile" : "sadSmile"}></div>
                        <div className="feedback">
                        {
                            this.state.feedback.split("||").map ((itm,ii)=>
                                    <div key={ii}>{itm}</div>
                            )
                        }
                        </div>
                        {this.state.questions[this.state.current].hints && this.state.numberOfWrongAnswers>1 && !this.state.bCorrectAnswer &&<div><button className="btn hintBtn" onClick={this.showHint}>{this.state.currentHint===0 ? "אפשר רמז ?" : "אפשר עוד רמז ?"}</button></div>}
                        {(!this.state.questions[this.state.current].hints || this.state.numberOfWrongAnswers<=1 || this.state.bCorrectAnswer) && <div><button className="btn" onClick={this.returnToQuestion}>{this.state.bCorrectAnswer ? "המשימה הבאה" : "חזרה למשימה"}</button></div>}
                    </div>}
            </div>
        )
    }
    answer(){
        if (helper.trim(document.querySelector(".answer").value)==="")return;
        const arAnswers=this.state.questions[this.state.current].answer.split("||").map((answer,ii)=>answer.trim());
        if (arAnswers.includes(helper.trim(document.querySelector(".answer").value))){
            let feedback=helper.trim(this.state.questions[this.state.current].feedbackAfterCorrectAnswer);
            if (!feedback){
                feedback="תשובה נכונה";
            }
            if (this.state.current+1<this.state.questions.length){
                this.rememberQuestion(this.state.current+1);
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
            database.ref("answers_tracking").push({questionNum:this.state.current+1,date_stamp:new Date().toString()});
        }else{
            let feedback=helper.trim(this.state.questions[this.state.current].feedbackAfterIncorrectAnswer);
            if (!feedback){
                feedback="תשובה לא נכונה";
            }
            this.setState(prev=>({
                show:"feedback",
                feedback:feedback,
                numberOfWrongAnswers:prev.numberOfWrongAnswers+1,
                currentHint:this.state.questions[this.state.current].hints ? Math.min(this.state.questions[this.state.current].hints.length-1,prev.numberOfWrongAnswers+1 >=2 ? prev.currentHint+1 : -1) : -1,
                bCorrectAnswer:false                
            }))
        }
        document.querySelector(".answer").value="";
    }
    rememberQuestion(iQuestionNum){
        localStorage.setItem("current",iQuestionNum);
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
