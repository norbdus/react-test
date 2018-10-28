import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom';
import Auth from './modules/Auth';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from  './components/Dashboard';

class App extends Component {
    constructor() {
        super();
        this.state = {
            auth: Auth.isUserAuthenticated(),
        }
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleRegisterSubmit(e, data) {
        e.preventDefault();
        console.log(data);
        fetch('/register', {
            method: 'POST',
            body: JSON.stringify({
               user: data,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                Auth.authenticateToken(res.token);
                this.setState({
                    auth: Auth.isUserAuthenticated(),
                    // shouldGoToDash: true,
                });
            }).catch(err => {
                console.log(err);
        })
    }

    handleLogout(){
        console.log('logout...');
        fetch('/logout', {
            method: 'DELETE',
            headers: {
                token: Auth.getToken(),
                'Authorization': `Token ${Auth.getToken()}`,
            }
        }).then(res => {
            Auth.deauthenticateToken();
            this.setState({
                auth: Auth.isUserAuthenticated(),
            }).catch(err => console.log(err));
        });
    }

    handleLoginSubmit(e, data) {
        e.preventDefault();
        fetch('/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
        .then(res => {
            // console.log(`Olha a resposta ${valid}`);
            // if(this.shouldGoToDash){
                window.Materialize.toast('Seja Bem Vindo', 5000);
                Auth.authenticateToken(res.token);
                this.setState({
                    auth: Auth.isUserAuthenticated(),
                });
            // }else{
                // window.Materialize.toast('Usuário ou senha inválido', 5000);
            // }
        }).catch(err => console.log(err));
        
    }

  render() {
      const AppContainer =
      {
          marginTop: '80px',
          width: '400px',
          height: 'auto',
      }
    return (
        <Router>
            <div className='App'>
            {console.log(`Token ${!this.state.auth}`)}
            <Route exact path="/" render={() => (!this.state.auth) 
                ? <div className="container white z-depth-2" style={AppContainer}>
                        <ul className="tabs teal" >
                            <li className="tab col s3">
                                <Link className="white-text active"  to="#login">login</Link>
                            </li>
                            <li className="tab col s3">
                                <Link className="white-text" to="#register">register</Link>
                            </li>
                        </ul>
                        <div id="login" className="col s12">
                            <LoginForm handleLoginSubmit={this.handleLoginSubmit} />
                        </div>
                        <div id="register" className="col s12">
                            <RegisterForm handleRegisterSubmit={ this.handleRegisterSubmit } />
                        </div>
                    </div>
                : <Redirect to="/dash" />
            } />
            <Route exact path="/dash" render={() => <Dashboard />} />

          </div>
        </Router>
    );
  }
}

export default App;
