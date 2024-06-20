function Todo(props) {
    return(
        <div className={"App"}>
            <input id={props.id} type={"checkbox"} defaultChecked={props.checked}/>
            <label>{props.name}</label>
        </div>
    );
}

export default Todo;
