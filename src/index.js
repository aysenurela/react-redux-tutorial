import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux'

const state = {
    todos: [{ text: "eating", completed: true }, { text: "exercise", completed: false }],
    visibilityFilter: "SHOW_ALL"
}

const initialState = {
    visibilityFilter: 'SHOW_ALL',
    todos: []
}


//An action is a plain JavaScript object that describes what happened.

const actionAdd = { type: 'ADD_TODO', text: 'Go to swimming pool' }
const actionToggle = { type: 'TOGGLE_TODO', index: 1 }
const actionVisibilityFilter = { type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_COMPLETED' }

//In Redux, action creators simply return an action:
function addTodo(text) {
    return { type: "ADD_TODO", text }
}
function toggleTodo(index) {
    return { type: "TOGGLE_TODO", index }
}
function setVisibilityFilter(filter) {
    return { type: "SET_VISIBILITY_FILTER", filter }
}


//REDUCER////////////////////////////////////////////////////////////////////////////////////////
//Finally, to tie state and actions together, we write a function called a reducer.
//it’s just a function that takes state and action as arguments, and returns the next state of the app.

function todoApp(state = initialState, action) {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return Object.assign({}, state, {
                visibilityFilter: action.filter
            })
        case "ADD_TODO":
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                        text: action.text,
                        completed: false
                    }
                ]
            })
        case "TOGGLE_TODO":
            return Object.assign({}, state, {
                todos: state.todos.map((todo, index) => {
                    if (index === action.index) {
                        return Object.assign({}, todo, {
                            completed: !todo.completed
                        })
                    }
                    return todo
                })
            })
        default:
            return state
    }
}

//REDUCER////////////////////////////////////////////////////////////////////////////////////////


const store = createStore(todoApp)
console.log("store", store)
console.log("state", store.getState())


// Dispatch some actions
store.dispatch(addTodo('Learn about actions'))
console.log("state", store.getState())
store.dispatch(addTodo('Learn about reducers'))
console.log("state", store.getState())
store.dispatch(addTodo('Learn about store'))
console.log("state", store.getState())






function App() {
    return (
        <div className="App">
            <input></input>
            <button>Add</button>
            <ul>
                {state.todos.map(function (elem) {
                    return <li> {elem.text} </li>
                })}
            </ul>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

