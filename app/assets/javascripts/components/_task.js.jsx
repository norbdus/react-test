class Task extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            editable: false
        }
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit(){
        if(this.state.editable){
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
        let description = this.state.editable ? <input type='text' ref={input => this.description = input} defaultValue={this.props.todo.description}/>:<p>{this.props.todo.description}</p>
        return (
            <div>
                {description}
                <button onClick={() => this.handleEdit()}>{this.state.editable? 'Submit' : 'Edit'}</button>
                <button onClick={() => this.props.handleDelete(this.props.todo.id)}>Delete</button>
            </div>
        )
    }

}