import React from 'react';
import base from './../helpers/fb'

import Header from './../components/header.component';
import AddTodo from './../components/add-todo.component';
import List from './../components/list.component';

class App extends React.Component {
    constructor(props) {
        super(props);

        const currentUser = JSON.parse(localStorage.getItem('user'));

        this.state = {
            todos: {},
            loaded: false,
            currentUser
        };

        this.authHandler = this.authHandler.bind(this);
        this.todoToggle = this.todoToggle.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.signOut = this.signOut.bind(this);
        this.toggleLoaded = this.toggleLoaded.bind(this);
    }

    componentWillMount(){
        base.onAuth((user)=> {
            let currentUser;

            if(user) {
                currentUser = user;

                localStorage.setItem('user', JSON.stringify(user));

                /*this.ref = base.syncState(`users/${user.uid}/todos`, {
                    context: this,
                    state: 'todos',
                    then(){
                        this.setState({
                            loaded: true
                        })
                    },
                    isNullable: true,
                    onFailure() {
                        console.log('fail');
                    }
                })*/
            } else {
                currentUser = null;
                localStorage.removeItem('user');
            }

            this.setState({
                currentUser
            });

        })
    }
    componentDidMount() {

    }

    authenticate(provider){
        base.authWithOAuthPopup(provider, this.authHandler.bind(this))
    }

    authHandler(error, authData) {
        if(error) return error;
    }


    signOut() {
        base.unauth();
    }

    toggleLoaded() {
        this.setState({
            loaded: !this.state.loaded
        })
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


    render() {

        const {currentUser, loaded} = this.state;

        /*if(currentUser && !loaded) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                            <div className="sign-in centered-wrapper main-wrapper">
                                <div className="centered-wrapper__inner">
                                    <h2 className="main-wrapper__title">Loading ...</h2>
                                    <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }*/

        if(currentUser) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                            <Header user={this.state.currentUser} signOut={this.signOut}/>
                            <h2 className="text-center"><span>RAC FIREBASE TODO!</span></h2>
                            <List user={this.state.currentUser}
                                  todos={this.state.todos}
                                  todoToggle={this.todoToggle}
                                  removeTodo={this.removeTodo}
                                  toggleLoaded={this.toggleLoaded}
                            />
                            <AddTodo addTodo={this.addTodo}/>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                        <div className="sign-in centered-wrapper main-wrapper">
                            <div className="centered-wrapper__inner">
                                <h2 className="main-wrapper__title">Sign In</h2>
                                <button className="btn btn-default" onClick={this.authenticate.bind(this, 'github')}>Sign with Github</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;