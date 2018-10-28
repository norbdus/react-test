import React, { Component } from 'react';
import Moment from 'moment';
import { Input } from 'react-materialize';

class Task extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
        }
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit() {
        if (this.state.editable) {
            let description = this.description.value
            let id = this.props.todo.id
            let task = { id: id, description: description }
            this.props.handleUpdate(task)
        }
        this.setState({
            editable: !this.state.editable
        })
    }

    render() {

        const textDone = {
            textDecoration: 'line-through',
            color: '#a6a6a6',
        }
        
        const cursor = {
            cursor: 'pointer',
        }
        
        let description = this.state.editable ? <input type='text' ref={input => this.description = input} defaultValue={this.props.todo.description} /> : <p>{this.props.todo.description}</p>
        let edit_button = this.props.todo.done ?  '' : <i className='grey-text small material-icons' style={cursor} onClick={() => this.handleEdit()}>{this.state.editable ? 'save' : 'mode_edit'}</i>
        return (
            <div className="row">
                <div className="col s12 m12">
                    <div className="card yellow lighten-4">
                        <div className="card-content white-text left-align">
                            <span className="card-title black-text text-darken-2"><div style={ this.props.todo.done ? textDone : {} }>{description}</div>
                            </span>
                            <label className='row'>{Moment(this.props.todo.created_at).format('LLLL')}</label>
                            <Input name='group1' type='checkbox' value='red' label='Done' checked={this.props.todo.done}  onChange={() => this.props.handleDone(this.props.todo)} />
                        </div>
                        <div className="card-action right-align">
                            {edit_button}
                            <i className="grey-text small material-icons" style={cursor} onClick={() => this.props.handleDelete(this.props.todo.id)}>delete</i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Task;