import React from 'react';

import ListItem from './list-item.component';

import './../scss/list.component.scss';

import base from './../helpers/fb';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.renderTodos = this.renderTodos.bind(this);

        this.state = {
            todos: {}
        }

        this.todoToggle = this.todoToggle.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);

    }

    componentDidMount() {
        console.log(1)
        const {user} = this.props;

        if(user) {
            base.syncState(`users/${user.uid}/todos`, {
                context: this,
                state: 'todos',
                then(){
                    this.props.toggleLoaded()
                },
                isNullable: true,
                onFailure() {
                    console.log('fail');
                }
            })
        }

       /* */

    }
    componentWillUnmount() {

    }

    todoToggle(todoKey, todoChecked) {
        if(this.state.todos[todoKey]['done'] !== todoChecked) {
            this.state.todos[todoKey]['done'] = todoChecked;
            this.setState({
                todos: this.state.todos
            })
        }
    }

    addTodo(title) {
        const timeStamp = new Date().getTime();
        const todoKey = `todo-${timeStamp}`;

        const newTodo = {
            title,
            done: false
        };

        this.state.todos[todoKey] = newTodo;
        this.setState({
            todos: this.state.todos
        })
    }

    removeTodo(todoKey) {
        this.state.todos[todoKey] = null;
        this.setState({
            todos: this.state.todos
        })
    }

    renderTodos(key) {
        return (
            <ListItem key={key} todoKey={key} todo={this.state.todos[key]} todoToggle={this.todoToggle} removeTodo={this.removeTodo}/>
        )
    };
    render(){
        return (
            <div className="todo-list">
                <ul className="list-group">
                    {Object.keys(this.state.todos).map(this.renderTodos)}
                </ul>
            </div>
        )
    }
}


/*const List = (props) => {

    const {todos, todoToggle, removeTodo} = props;

    const renderTodos = (key) => {
        return (
            <ListItem key={key} todoKey={key} todo={todos[key]} todoToggle={todoToggle} removeTodo={removeTodo}/>
        )
    };

    return (

        <div className="todo-list">
            <ul className="list-group">
                {Object.keys(todos).map(renderTodos)}
            </ul>
        </div>

    )
}*/

export default List;