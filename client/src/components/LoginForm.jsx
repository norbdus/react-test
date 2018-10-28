import React, { Component } from 'react';
import { Row, Input} from 'react-materialize';

import './LoginForm.css';


class LoginForm extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const val = e.target.value;
        this.setState({
            [name]: val,
        });
    }

    render() {
        const formContainer = {
            padding: '40px',
            paddingTop: '10px',
        }

        return (
            <div className="col s12">
                <form className="col s12" onSubmit={(e) =>
                    this.props.handleLoginSubmit(e, this.state)}>
                    <div style={formContainer}>
                        <Row>
                            <div className="input-field col s12">
                                <Input s={12} type="text" name="username" label="Username" value={this.state.username} onChange={this.handleChange} />
                            </div>
                        </Row>
                        <Row>
                            <div className="input-field col s12">
                                <Input s={12} type="password" name="password" label="Password" value={this.state.password} onChange={this.handleChange} /> 
                            </div>
                        </Row>
                    <input className="btn waves-effect waves-light teal col s12" type="submit"  value="Login" />
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginForm;