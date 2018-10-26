import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom';
import Auth from './modules/Auth';
import TaskList from './components/TaskList';
import RegisterForm from './components/RegisterForm';

class App extends Component {
    constructor() {
        super();
        this.state = {
            auth: Auth.isUserAuthenticated(),
        }
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    }

    handleRegisterSubmit(e, data) {
        e.preventDefault();
        console.log(data);
        fetch('/users', {
            method: 'POST',
            body: JSON.stringify({
               user: data,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(res => {
                Auth.authenticateToken(res.token);
                this.setState({
                    auth: Auth.isUserAuthenticated(),
                });
            }).catch(err => {
                console.log(err);
        })
    }

  render() {
    return (
        <Router>
          <div className="App">
              <Route exact path="/tasks" render={() =>
                  <TaskList />
              } />
              <Route exact path="/register" render={() => <RegisterForm  handleRegisterSubmit={ this.handleRegisterSubmit } /> } />
          </div>
        </Router>
    );
  }
}

export default App;
