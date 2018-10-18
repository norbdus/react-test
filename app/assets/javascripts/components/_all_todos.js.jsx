const AllTodos = (props) => {
    var todos = props.todos.map((todo) => {
        return (
            <div key={todo.id}>
                <h1>{todo.description}</h1>
                <h3>{todo.done}</h3>
            </div>
        )
    })
    return (
        <div>
            {todos}
        </div>
    )
}
