class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.addNewTask = this.addNewTask.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.updateTask = this.updateTask.bind(this)
    }

    

    handleFormSubmit(description){
        let body = JSON.stringify({ todo: {description: description} })
        fetch('http://localhost:3000/api/v1/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        }).then((response) => {return response.json()})
        .then((task) => {
            this.addNewTask(task)
        })
    }

    addNewTask(task){
        this.setState({
            tasks: this.state.todos.concat(task)
        })
    }

    handleDelete(id){
        fetch(`http://localhost:3000/api/v1/todos/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.deleteTask(id)
        })
    }

    handleUpdate(task){
        fetch(`http://localhost:3000/api/v1/todos/${task.id}`,
        {
            method: 'PUT',
            body: JSON.stringify({todo: task}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.updateTask(task)
        })
    }

    deleteTask(id){
        newTasks = this.state.todos.filter((task => task.id !== id))
        this.setState({
            todos: newTasks
        })
    }

    updateTask(task){
        let newTasks = this.state.todos.filter((f) => f.id !== task.id)
        newTasks.push(task)
        this.setState({
            todos: newTasks
        })
    }

    componentDidMount() {
        fetch('/api/v1/todos.json')
            .then((response) => { return response.json() })
            .then((data) => { this.setState({ todos: data }) });
    }

    render(){
        return(
            <div>
                <NewItem handleFormSubmit={this.handleFormSubmit} />
                <AllTodos todos={this.state.todos} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate} />
            </div>
        )
    }


}