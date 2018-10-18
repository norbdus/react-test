class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        fetch('/api/v1/todos.json')
            .then((response) => { return response.json() })
            .then((data) => { this.setState({ todos: data }) });
    }

    render(){
        return(
            <div>
                <AllTodos todos={this.state.todos} />
            </div>
        )
    }


}