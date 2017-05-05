import React from 'react';

const AddTodo = (props) => {

    const {addTodo} = props;

    const handleSubmit = (e) => {
        e.preventDefault(e.target.value);
        const title = e.target.todoTitle.value;
        if(title != '') {
            addTodo(title);
            e.target.reset();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    name="todoTitle"
                    type="text"
                    className="form-control"
                    placeholder="Add a new todo..."

                />
                <span className="input-group-btn">
                    <button className="btn btn-success" type="submit">Add new!</button>
                </span>
            </div>
        </form>
    )

};

export default AddTodo;