class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false
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
        let description = this.state.editable ? <input type='text' ref={input => this.description = input} defaultValue={this.props.todo.description} /> : <p>{this.props.todo.description}</p>
        let edit_button = this.props.todo.done ?  '' : <a onClick={() => this.handleEdit()}>{this.state.editable ? 'Salvar' : 'Editar'}</a>
        return (
            <div className="row">
                <div className="col s12 m12">
                    <div className="card yellow lighten-4">
                        <div className="card-content white-text left-align">
                            <span className="card-title"></span>
                            <label>
                                <input type="checkbox" defaultChecked={this.props.todo.done} onChange={() => this.props.handleDone(this.props.todo.id)} />
                                <span className={ this.props.todo.done ? 'task_done' :  '' }>{description}</span>
                            </label>
                        </div>
                        <div className="card-action right-align">
                            {edit_button}
                            <a onClick={() => this.props.handleDelete(this.props.todo.id)}>Apagar</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}