var config = {
    apiKey: "AIzaSyD4YV9XFRC7f7Mz__-8XTPPLebxVq4j0Ts",
    authDomain: "rac-todo.firebaseapp.com",
    databaseURL: "https://rac-todo.firebaseio.com",
    projectId: "rac-todo",
    storageBucket: "rac-todo.appspot.com",
    messagingSenderId: "32723539435"
};

import Rebase from 're-base';

const base = Rebase.createClass(config);

export default base;