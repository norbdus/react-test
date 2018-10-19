const AllTodos = (props) => {
    var todos = props.todos.map((todo) => {
        return (
            <div key={todo.id}>
                <h4 className={todo.done ? 'task-done' : 'task-open'}>{todo.description}</h4>
                <Task todo={todo} handleDelete={props.handleDelete} />
            </div>
        )
    })
    return (
        <div>
            {todos}
        </div>
    )
}
