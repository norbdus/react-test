const NewItem = (props) => {

    let formFields = {}

    return (
        <form onSubmit={(e) => {
            props.handleFormSubmit(formFields.description.value); e.target.reset();
        }
        } >
            <div className="row">
                <div className="input-field col s12">
                    <div className='col s10'>
                        <i className="material-icons prefix">content_paste</i>
                        <input ref={input => formFields.description = input} placeholder='Descreva a Task' />
                    </div>
                    <button className="waves-effect waves-light btn col s2" >Criar</button>
                </div>
            </div>
        </form>
    )
}