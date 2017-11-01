import React, { Component } from 'react';
// requiring firebase databases
var firebase = require('firebase');
var uuid = require("uuid");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAMtLObdbGKRyZSLMINKMxbzcwPF27JN1g",
  authDomain: "auten-734a6.firebaseapp.com",
  databaseURL: "https://auten-734a6.firebaseio.com",
  projectId: "auten-734a6",
  storageBucket: "auten-734a6.appspot.com",
  messagingSenderId: "516813726957"
};
firebase.initializeApp(config);

// Component
class Qandaapp extends Component {
  nameSubmit() {
    var studentName = this.refs.name.value
    this.setState({studentName: studentName}, function() {
      console.log(this.state);
    });
  }

  answerSelected(event) {
      var answers = this.state.answers;
      if(event.target.name === 'answer1'){
          answers.answer1 = event.target.value;
      } else if(event.target.name === 'answer2') {
        answers.answer2 = event.target.value;
      } else if(event.target.name === 'answer3') {
          answers.answer3 = event.target.value;
      } else if(event.target.name === 'answer4') {
          answers.answer4 = event.target.value;
      }

      this.setState({answers: answers}, function(){
        console.log(this.state);
      });
  }

questionsSubmit() {
    firebase.database().ref('auten/'+this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });
    this.setState({isSubmited: true});
}

  // constractor
  constructor(props){
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: 'Reagan',
      answers: {
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: ''
      },
      isSubmited: false
    };
    // binding functions
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionsSubmit = this.questionsSubmit.bind(this);
  }

  // rendering components
  render(){
    var studentName;
    var questions;

    if(this.state.studentName === '' && this.state.isSubmited === false) {
      studentName = <div>
                        <h5>What is Your Name?</h5>
                        <form onSubmit={this.nameSubmit}>
                            <input className="namy" type="text" placeholder="Enter Your Name"
                            ref="name"/>
                        </form>
                    </div>;
      questions = ''
    } else if(this.state.studentName !== '' && this.state.isSubmited === false) {
      studentName = <h3>Dear {this.state.studentName} Welcome to the Q&A </h3>
      questions = <div>
                    <h3>Answer to these Questions </h3>
                    <form onSubmit={this.questionsSubmit}>
                      <div className="card">
                          <label>What kind of Subject Do you like Studying</label>
                          <br />
                          <input className="namy" type="radio" value="Technolgy"
                              name="answer1" onChange={this.answerSelected} />Technolgy
                          <input className="namy" type="radio" value="Miltary School"
                              name="answer1" onChange={this.answerSelected} />Miltary School
                          <input className="namy" type="radio" value="Design"
                              name="answer1" onChange={this.answerSelected} />Design
                      </div>
                      <div className="card">
                          <label>What are your doing for living</label>
                          <br />
                          <input className="namy" type="radio" value="Studying"
                              name="answer2" onChange={this.answerSelected} />Studying
                          <input className="namy" type="radio" value="Looking For Job"
                              name="answer2" onChange={this.answerSelected} />Looking For Job
                          <input className="namy" type="radio" value="Working"
                              name="answer2" onChange={this.answerSelected} />Working
                      </div>
                      <div className="card">
                          <label>Are Your Happy With Online Courses</label>
                          <br />
                          <input className="namy" type="radio" value="Yes I am"
                              name="answer3" onChange={this.answerSelected} />Yes I am
                          <input className="namy" type="radio" value="No I am Not"
                              name="answer3" onChange={this.answerSelected} />No I am Not
                          <input className="namy" type="radio" value="I don't Know"
                              name="answer3" onChange={this.answerSelected} />I don't Know
                      </div>
                      <div className="card">
                          <label>What is your best focus of learning on technologies</label>
                          <br />
                          <input className="namy" type="radio" value="Cyber Security"
                              name="answer4" onChange={this.answerSelected} />Cyber Security
                          <input className="namy" type="radio" value="Programming"
                              name="answer4" onChange={this.answerSelected} />Programming
                          <input className="namy" type="radio" value="IT Analysing"
                              name="answer4" onChange={this.answerSelected} />IT Analysing
                      </div>

                      <button className="submitbutton" type="submit" value="Submit">Submit</button>
                    </form>
                </div>
    } else if(this.state.isSubmited ===  true) {
      studentName = <h4> Thanks For Answering to the Question have a nice day dear {this.state.studentName} </h4>;
    }


    return(
      <div>
        <h1>Welcom to Questions Application</h1>
        <div>
          {studentName}
          =============================
          {questions}
        </div>
      </div>
    );
  }
}

export default Qandaapp;
