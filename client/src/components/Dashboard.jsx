import React, { Component } from 'react';
import { Col, Preloader, Row } from 'react-materialize';

import Auth from '../modules/Auth';
import AddTaskForm from './AddTaskForm';
import Task from './Task';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            myTasks: [],
            tasksLoaded: false,
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewTask = this.addNewTask.bind(this)
        this.addTask = this.addTask.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.updateTask = this.updateTask.bind(this)
        this.handleDone = this.handleDone.bind(this)
        this.doneTask = this.doneTask.bind(this)
    }

    componentDidMount(){
        this.getUserTasks();
    }

    handleDone(task){
        fetch(`/api/v1/todos/${task.id}/done_task`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${Auth.getToken()}`,
            }
        }).then((response) => {
            // this.doneTask(task);
            this.getUserTasks();
        })
    }

    handleFormSubmit(description){
        let body = JSON.stringify({ todo: {description: description} })
        console.log(`Corpo:${body}`);
        fetch('/api/v1/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${Auth.getToken()}`,
            },
            body: body,
        }).then((response) => {return response.json()})
        .then((task) => {
            this.addNewTask(task);
        })
    }

    handleDelete(id){
        fetch(`/api/v1/todos/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${Auth.getToken()}`,
            }
        }).then((response) => {
            this.deleteTask(id)
        })
    }

    handleUpdate(task){
        fetch(`/api/v1/todos/${task.id}`,
        {
            method: 'PUT',
            body: JSON.stringify({todo: task}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${Auth.getToken()}`,
            }
        }).then((response) => {
            this.updateTask(task)
        })
    }

    deleteTask(id){
        let newTasks = this.state.myTasks.filter((task => task.id !== id))
        console.log(`IDDD: ${id}`);
        console.log(`tasks: ${newTasks}`);
        this.setState({
            myTasks: newTasks,
        })
    }

    doneTask(task){
        let newTasks = this.state.myTasks.filter((f) => f.id !== task.id)
        newTasks.push(task);
        this.setState({
            myTasks: newTasks,
            tasksLoaded: true,
        })
    }

    addNewTask(task){
        this.setState({
            tasks: this.state.myTasks.concat(task)
        })
    }

    updateTask(task){
        let newTasks = this.state.myTasks.filter((f) => f.id !== task.id)
        newTasks.push(task)
        this.setState({
            myTasks: newTasks,
            tasksLoaded: true,
        })
    }

    getUserTasks(){
        fetch('/api/v1/todos', {
            method: 'GET',
            headers: {
                token: Auth.getToken(),
                'Authorization': `Token ${Auth.getToken()}`,
            }
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({
                myTasks: res,
                tasksLoaded: true,
            })
        }).catch(err => console.log(err));
    }

    addTask(e, data) {
        console.log('addTask..');
        fetch('/api/v1/todos',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: Auth.getToken(),
                'Authorization': `Token ${Auth.getToken()}`,
            },
            body: JSON.stringify({
                todo: data,
            }),
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            this.getUserTasks();
        }).catch(err => console.log(err));

        e.preventDefault();
    }

    render(){
        const dash =  {
            marginTop: '30px',
            maxWidth: '500px',
        }        

        const AllTodos = (props) => {
            var todos = this.state.myTasks.map((todo) => {
                return (
                    <div key={todo.id}>
                        <Task todo={todo} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate} handleDone={props.handleDone} />
                    </div>
                )
            })
            return (
                <div>
                    {(this.state.tasksLoaded) ? todos : <Col s={4}> <Preloader flashing/> </Col>}
                </div>
            )
        }

        return (
                <div className='card' style={dash}>
                <Row>
                    <h2 className="col s10">Todo-List</h2>
                    <span className='col s2'><i className='grey-text small material-icons'>power_settings_new</i></span>
                </Row>
                
                    <AddTaskForm addTask={this.addTask} />
                    <AllTodos todos={this.state.myTasks} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate} handleDone={this.handleDone} />
                </div>
        )
        
    }
        
}

export default Dashboard;


// return (
    //     <div className="card" style={dash}>
    //         <h2>Todo-List</h2>
    //         <AddTaskForm addTask={this.addTask} />
    //         {(this.state.tasksLoaded)
    //         ? this.state.myTasks.map(task => {
    //             return (
    //                 <div className="row">
    //                     <div className="col s12 m12">
    //                         <div className="card yellow lighten-4">
    //                             <div className="card-content white-text left-align">
    //                                 <span className="card-title"></span>
    //                                 <label>
    //                                     <input type="checkbox" defaultChecked={task.done} onChange={() => this.props.handleDone(this.props.todo.id)} />
    //                                     <span className={ task.done ? 'task_done' :  '' }>
    //                                     {task.done 
    //                                     ? <input type='text' ref={input => task.description = input} defaultValue={task.description} />
    //                                     : <p>{task.description}</p>
    //                                 }
    //                                     </span>
    //                                 </label>
    //                             </div>
    //                             <div className="card-action right-align">
    //                                 {task.done ? '' : <a onClick={() => this.handleEdit()}>{task.done ? 'Salvar' : 'Editar'}</a> }
    //                                 <a onClick={() => this.props.handleDelete(this.props.todo.id)}>Apagar</a>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>)
    //         })
    //         : <p>Loading...</p>
    //         }
    //     </div>

    // )