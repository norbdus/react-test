const AllTodos = (props) => {
    var todos = props.todos.map((todo) => {
        return (
            <div key={todo.id}>
                <Task todo={todo} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate} handleDone={props.handleDone} />
            </div>
        )
    })
    return (
        <div>
            {todos}
        </div>
    )
}
