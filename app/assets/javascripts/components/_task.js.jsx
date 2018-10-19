class Task extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            editable: false
        }
    }

    render() {
        let description = this.state.editable ? <input type='text' ref={input => this.name = input} defaultValue={this.props.todo.description} />:<h3>{this.props.todo.description}</h3>
        return (
            <div>
                <h1>{this.props.todo.description}</h1>
                <button>{this.state.editable? 'Submit' : 'Edit'}</button>
                <button onClick={() => this.props.handleDelete(this.props.todo.id)}>Delete</button>
            </div>
        )
    }

}