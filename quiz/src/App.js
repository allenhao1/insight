import React, { Component } from 'react';
import update from 'react-addons-update';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
const request = require('request');
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions : [],
      counter: 0,
      percentCorrect: 0,
      questionId: 1,
      question: '',
      score: 0,
      answerOptions: [],
      answer: '',
      answersCount: {
        Nintendo: 0,
        Microsoft: 0,
        Sony: 0
      },
      result: ''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    var userId = "92d8ed46217948a4ccc4b803";
    var url = "http://localhost:9000/questions?_id=" + userId;
    var app = this;
    request(url, {withCredentials: false}, function(error, response, body) {
      if (!error && response.statusCode == 200){
        var questions = JSON.parse(body);
        app.setState({
          questions: questions,
          question: questions[0].text,
          answerOptions: questions[0].answers
        });
        // const shuffledAnswerOptions = questions.map((question) => this.shuffleArray(question.answers));


      }
    });
  }




  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < this.state.questions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
    } else {
        setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: {$apply: (currentValue) => currentValue + 1}
    });
    console.log("SCORE B4 - " + this.state.score);
    const updatedScore = parseInt(this.state.score) + parseInt(answer);
    console.log("SCORE AFTER - " + updatedScore);

    this.setState({
        answersCount: updatedAnswersCount,
        answer: answer,
        score: updatedScore
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    const score = this.state.score;
    const questions = this.state.questions;

    this.setState({
        counter: counter,
        score: score,
        questionId: questionId,
        question: questions[counter].text,
        answerOptions: questions[counter].answers,
        answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    var score = this.state.score / this.state.questions.length;
    var http = new XMLHttpRequest();
    var url = "http://localhost:9000/scores";
    var params = "score=" + score + "&_id=" + "92d8ed46217948a4ccc4b803";
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(params);
    this.setState({ result: "YOUR SCORE IS " + Math.round(score*100)/100 });
  }

renderQuiz() {
    var questions = this.state.questions;
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        counter = {this.state.counter}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={questions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.result} />
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="http://coenraets.org/present/react/img/react.png" className="App-logo" alt="logo" />
          <h2>Insight</h2>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }

}

export default App;
