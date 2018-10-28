import React, { Component } from 'react';

class AddTaskForm extends Component{
    constructor(){
        super();
        this.state = {
            description: '',
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        console.log('chegando no handle Change');
        // const name = e.target.name;
        const val = e.target.value;
        this.setState({
            description: val,
        })
    }

    render () {
        return (
            <div className="form">
                <form onSubmit={(e) => {this.props.addTask(e, this.state)}}>
                    <div className="row">
                        <div className="input-field col s12">
                            <div className='col s10'>
                                <i className="material-icons prefix">content_paste</i>
                                <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} />
                            </div>
                            <input className="waves-effect waves-light btn col s2" type="submit" value="Add" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddTaskForm;