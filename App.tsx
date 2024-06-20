import React, {createRef, useEffect} from 'react';
import { useState } from 'react';
import './App.css';
import Todo from './Todo.jsx'
import {getMouseEventProps} from "@testing-library/user-event/dist/keyboard/getEventProps";
import { nanoid } from "nanoid";
import Countd from './Countd.jsx'

// function message(){
//     alert("Hello, "+ "user" + ".")
// }

/*function handleSubmit(e: { preventDefault: () => void; target: any; }) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    alert(""+formJson);
}*/


function App(props: { tasks: any; }) {
    const [Task, setTask] = useState(''); // Declare a state variable
    const [userInput, setInput] = useState('');
    const [tasks, setTasks] = useState(props.tasks);

    useEffect(() => {
        const store = JSON.stringify(tasks);
        localStorage.setItem("tasks", store); // set to new value
    }, [tasks]);

    useEffect(() => {
        const store = localStorage.getItem("tasks");
        // @ts-ignore
        const savedTasks = JSON.parse(store);
        if(savedTasks)
            setTasks(savedTasks);
    }, []);

    function addTask(name: string){
        const newTask = {id: `${nanoid()}`, name, checked: false}
        setTasks([...tasks, newTask]);
    }

    const deleteTask = (taskToDel: { id: string; name: string; checked: boolean; }) => {
        const newTaskList = tasks.filter((Task: { id: string; name: string; checked: boolean; }) => Task !=  taskToDel);
        setTasks(newTaskList);
    }

    const taskList = tasks.map((Task: { id: string; name: string; checked: boolean; }) =>(
        <div>
            <Todo
                id = {Task.id}
                name = {Task.name}
                checked = {Task.checked}
                key = {Task.id}
            />
            <button className={"button2"} onClick={() => deleteTask(Task)}>Delete</button>
        </div>
    ));

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setTask(userInput);
        setInput('');
        addTask(userInput);
    }

    const handleChange = (e: { currentTarget: { value: React.SetStateAction<string>; }; }) => {
        setInput(e.currentTarget.value)
    }
    //<button className={"button"}>Test</button>
    //<button id={"myButton"}  ref={"Countd.tsx"}> Countdown </button>
    return (
    <div className={"App-main"}>

        <header className="App-header" >
          TASK LIST
        </header>

        <p className="App-link">This is an extension made through react.
            <hr/>
            <form method={"post"} onSubmit={handleSubmit}>
                <label>
                    Enter a task: <input name="myInput" value={userInput} // force the input's value to match the state variable
                    //onChange={e => setTask(e.target.value)} // ... and update the state variable on any edits
                    //onSubmit = {e => setTask(e.currentTarget.value)}
                    onChange={handleChange}
                />
                </label>
                <button id="myButton" className={"button"} type={"submit"} onClick={() => alert("You added a Task: " + userInput)}> Submit </button>
            </form>

            <hr/>
            <p>Your tasks: </p>
                <p className="App">{taskList}</p>
        </p>
    </div>
  );
}
export default App;
