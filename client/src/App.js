import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import { Navbar, NavItem, Icon } from 'react-materialize';
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
                if(res["message"] == 'error'){
                    window.Materialize.toast(`${res['error'][0]} ${res['error'][1]}`, 5000);
                }else{
                    Auth.authenticateToken(res.token);
                    this.setState({
                        auth: Auth.isUserAuthenticated(),
                        // shouldGoToDash: true,
                    });
                }
                
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
                auth: false,
            });
        }).catch(err => console.log(err));
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
            console.log(`olha a resposta ${res.inspect}`);
            Auth.authenticateToken(res.token);
            console.log(`olha a autenticacao ${Auth.isUserAuthenticated()}`);
            if (Auth.isUserAuthenticated()){
                this.setState({
                    auth: true,
                });
                window.Materialize.toast('Seja Bem Vindo', 5000);
            }else{
                window.Materialize.toast('Usuário ou senha inválidos', 5000);
            }
        }).catch(err => console.log(err));
        
    }

  render() {
      const AppContainer =
      {
          marginTop: '80px',
          width: '400px',
          height: 'auto',
      }

      const NavBar = (props) => {
          return(
            <Navbar className="" brand='My Todo-List' right >
                <NavItem className="grey-text" onClick={this.handleLogout} ><Icon>power_settings_new</Icon></NavItem>
            </Navbar>
          )
      }

      const Login = (props) => {
          return(
            <div className="container white z-depth-2" style={AppContainer}>
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
          )
      }
      const DashWithNav = (props) => {
        return(
            <div>
                <NavBar />
                <Dashboard />
            </div>
        )
      }
    return (

        <Router>
            <div className='App'>
                <Route exact strict path="/" render={() => {
                    return(<Redirect to='/login' />);
                    }} />
                <Route exact strict path="/login" render={() => (
                    this.state.auth ? (<DashWithNav />) : (<Login />) )
                    } />
                <Route exact strict path="/dash" render={() => ( 
                    this.state.auth ? (<DashWithNav />) : (<Redirect to='/' />) ) 
                    } />
            </div>
        </Router>
    );
  }
}

export default App;
