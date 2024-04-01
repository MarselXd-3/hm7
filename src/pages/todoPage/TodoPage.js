import React, { useEffect, useState } from 'react';
import Todo from "../../components/todo/Todo";

function TodoPage() {
    const [input, setInput] = useState("")
    const [lists, setLists] = useState([])

    async function getTodoLists() {
        const response = await fetch('http://localhost:8000/lists');
        const data = await response.json()
        setLists(data)
    }

    function changeInput(event) {
        setInput(event.target.value)
    }

    async function createTodo(event) {
        event.preventDefault()
        const data = {
            title: input,
            status: false
        }

        const response = await fetch('http://localhost:8000/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        setInput(""); // Очищаем поле Input
        getTodoLists()
    }

    async function changeStatus(event) {
        const checked = event.target.checked
        const id = event.target.value
        const data = {
            status: checked
        }
        const response = await fetch(`http://localhost:8000/lists/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        getTodoLists()
    }

    async function deleteTodo(id) {
        const response = await fetch(`http://localhost:8000/lists/${id}`, {
            method: 'DELETE'
        });

        getTodoLists();
    }

    useEffect(() => {
        getTodoLists()
    }, [])


    return (
        <div>
            <form onSubmit={createTodo}>
                <input type="text" onChange={changeInput} value={input}/> {/* Добавляем value для связывания с состоянием input */}
                <button type="submit">create</button>
            </form>
            <ul>
                {
                    lists.length > 0
                        ?
                        lists.map(el => <Todo key={el.id} todo={el} changeStatus={changeStatus} deleteTodo={deleteTodo}/>)
                        :
                        <li>нет дел</li>
                }
            </ul>
        </div>
    );
}

export default TodoPage;
