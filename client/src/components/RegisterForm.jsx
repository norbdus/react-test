import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            name: '',
        }
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {
        const  name = e.target.name;
        const val = e.target.value;
        this.setState({
            [name]: val,
        })
    }

    render() {
        const formContainer = {
            padding: '20px',
            paddingTop: '10px',
        }
        return (
            <div className="col s12">
               <form className="col s12" onSubmit={(e) => this.props.handleRegisterSubmit(e, this.state)}>
               <div style={formContainer}>
                    <Row>
                        <div className="input-field col s12">
                            <Input s={6} type="text" name="username" label="Username"  value={this.state.username} onChange={this.handleChange} />
                        
                            <Input s={6} type="password" name="password" label="Password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                    </Row>
                    <Row>
                        <div className="input-field col s12">
                    <       Input s={12} type="email" name="email" label="Email" value={this.state.email} onChange={this.handleChange} />
                        </div>
                    </Row>
                    <Row>
                        <div className="input-field col s12">
                            <Input s={12} type="text" name="name" label="Name" value={this.state.name} onChange={this.handleChange} />
                        </div>
                    </Row>
                    <input className="btn waves-effect waves-light teal" type="submit"  value="Register" />
                   </div>
               </form>
           </div>
        )
    }
}

export default RegisterForm;