const NewTask = (props) => {

    let formFields = {}

    return(
        <form>
            <input ref={ input => formFields.description = input } placeholder='Descreva a Task'/>
            <input ref={ input => formFields.done = input } placeholder='Descreva a Task'/>
        </form>
    )
}