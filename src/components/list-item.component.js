import React from 'react';


const ListItem = (props) => {

    const {todo, todoToggle, todoKey, removeTodo} = props;

    const onChangeHandler = (e) => {
        const todoKey = e.target.getAttribute('data-todo-key');
        const todoChecked = e.target.checked;
        todoToggle(todoKey, todoChecked);
    };

    return (

        <li className="list-group-item">
            <span className="pull-right"><button className="btn btn-danger" onClick={() => removeTodo(todoKey)}><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button></span>
            <div className="checkbox task-name">
                <label>
                    <input type="checkbox" checked={todo['done']} onChange={onChangeHandler} data-todo-key={todoKey}/> <span>{todo['title']}</span>
                </label>
            </div>
        </li>

    )
};

export default ListItem;