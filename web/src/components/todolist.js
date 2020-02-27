import React from 'react';
import Todo from './todo'

const TodoList = (props) => {

    const todos = [
        {
            "id": 1,
            "value": "Buy milk",
            "done": false
        },
        {
            "id": 2,
            "value": "Play with doge",
            "done": true
        }
    ]

    return (
        <div>
            <div className="hero is-info">
                <div className="hero-body has-text-centered">
                    <p className="title is-1">Todos</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {todos.map(todo => (
                        <Todo key={todo.id} todo={todo} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default TodoList;