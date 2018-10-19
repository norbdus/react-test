const NewItem = (props) => {

    let formFields = {}

    return (
        <form onSubmit={(e) => {
            props.handleFormSubmit(formFields.description.value); e.target.reset();
        }
        } >
            <input ref={input => formFields.description = input} placeholder='Descreva a Task' />
            <button>Criar</button>
        </form>
    )
}