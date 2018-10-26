import React, { Component } from 'react';

class TaskList extends Component {
    constructor() {
        super();
        this.state = {
            tasksList: null,
            tasksListLoaded: false,

        }
    }

    componentDidMount(){
        fetch('/api/v1/todos')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    tasksList: res.tasks,
                    tasksListLoaded: true,
                })
                console.log(res);
            }).catch( err => console.log(err) ) ;
    }

    renderTasks() {
        return this.state.tasksList.map( task => {
            return (
                <div className="monster" key={task.id}>
                    <h2> {task.description} </h2>
                </div>
            )
        } )
    }

    render () {
        return (
            <div className={"task-list"}>
                { this.state.tasksListLoaded
                    ? this.renderTasks()
                    : <p> Loading...</p>
                }
            </div>
        )
    }
}

export default TaskList;