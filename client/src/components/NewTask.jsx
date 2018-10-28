import React, { Component } from 'react';


class NewTask extends Component {

    constructor(){
        super();
        this.state = {
            description: '',
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const  name = e.target.name;
        const val = e.target.value;
        this.setState({
            [name]: val,
        })
    }

    render(){

        return (
            <form onSubmit={(e) => {
                this.props.addMonster(e,this.state); e.target.reset(); }
            } >
                <div className="row">
                    <div className="input-field col s12">
                        <div className='col s10'>
                            <i className="material-icons prefix">content_paste</i>
                            <input value={this.state.description} onChange={this.handleChange} placeholder='Descreva a Task' />
                        </div>
                        <input type='submit' className="waves-effect waves-light btn col s2" value='Add' />
                    </div>
                </div>
            </form>
        )
    }

    
}

export default NewTask;