import React from 'react';

function Todo({ todo, changeStatus, deleteTodo }) {
    return (
        <li>
            {todo.status ? <s>{todo.title}</s> : todo.title }
            <input type="checkbox" onChange={changeStatus} value={todo.id} checked={todo.status}/>
            <button onClick={() => deleteTodo(todo.id)}>delete todo</button>
        </li>
    );
}

export default Todo;
