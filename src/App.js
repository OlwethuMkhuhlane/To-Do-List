import React, { useState } from 'react';
import toDo from './to-do.jpg';//importing the to-do
import './App.css';//importing the app css


function App() {//Creating the app function
  const [todos, setTodos] = useState([
    {
      content: 'Feed the kids breakfast',
      isCompleted: false,
    },
    {
      content: 'Go shopping',
      isCompleted: false,
    },
    {
      content: 'Cook Supper',
      isCompleted: false,
    },

    {
      content: 'Go to shooting range',
      isCompleted: false,
    },

    {
      content: 'Fetch Granny from old age on weekends',
      isCompleted: false,
    },

    {
      content: 'Clean up the house',
      isCompleted: false,
    }
  ]);
//function to handle Key Down
  function handleKeyDown(e, i) {
    if (e.key === 'Enter') {
      createTodoAtIndex(e, i);
    }
    if (e.key === 'Backspace' && todos[i].content === '') {
      e.preventDefault();
      return removeTodoAtIndex(i);
    }
  }
 //function of createTodoAtIndex
  function createTodoAtIndex(e, i) {
    const newTodos = [...todos];
    newTodos.splice(i + 1, 0, {
      content: '',
      isCompleted: false,
    });
    setTodos(newTodos);
    setTimeout(() => {
      document.forms[0].elements[i + 1].focus();
    }, 0);
  }
//function to update the list at index
  function updateTodoAtIndex(e, i) {
    const newTodos = [...todos];
    newTodos[i].content = e.target.value;
    setTodos(newTodos);
  }
//Allows user to remove item on list
  function removeTodoAtIndex(i) {
    if (i === 0 && todos.length === 1) return;
    setTodos(todos => todos.slice(0, i).concat(todos.slice(i + 1, todos.length)));
    setTimeout(() => {
      document.forms[0].elements[i - 1].focus();
    }, 0);
  }
//mark out complete task/ vise-versa
  function toggleTodoCompleteAtIndex(index) {
    const temporaryTodos = [...todos];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodos(temporaryTodos);
  }
//Return the App function
//allows user to edit the checklist
  return (
    <div className="app">
      <div className="header">
        <p>You can edit current checklist</p>
        <p>Select/unselect on the checklist</p>
        <p>You can delete an item on the list</p>

        <h1>TO-DO LIST</h1>

      </div>
      <form className="todo-list">
        <ul>
          {todos.map((todo, i) => (
            <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`}>
              <div className={'checkbox'} onClick={() => toggleTodoCompleteAtIndex(i)}>
                {todo.isCompleted && (
                  <span>&#x2714;</span>
                )}
              </div>
              <input
                type="text"
                value={todo.content}
                onKeyDown={e => handleKeyDown(e, i)}
                onChange={e => updateTodoAtIndex(e, i)}
              /> 
            </div>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;